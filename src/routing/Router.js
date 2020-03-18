// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { routes } from './routes';
import PageLayout from './components/PageLayout';
import Login from './components/Login/Login';
import PageNotFound from './components/PageNotFound';

type CookieProps = {
  session: SessionProps,
};

export type SessionProps = {
  teamId: Uuid,
  isAdmin: boolean,
};

const Router = ({ rootUrl }: { rootUrl: string }) => {
  const [cookies, setCookie, removeCookie] = useCookies<CookieProps, SessionProps>(['session']);

  const setSession = (teamId: Uuid, isAdmin: boolean) => {
    setCookie('session', { teamId, isAdmin }, { path: '/' });
  };

  const deleteSession = () => {
    removeCookie('session', {});
  };

  return (
    <Switch>
      <Route exact path='/'>
        <Login rootUrl={rootUrl} setSession={setSession} />
      </Route>
      <PageLayout deleteSession={deleteSession}>
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            render={() =>
              !cookies.session ? (
                <Redirect
                  to={{
                    pathname: '/',
                    state: { from: route.path },
                  }}
                />
              ) : (
                <route.component teamId={cookies.session.teamId} isAdmin={cookies.session.isAdmin} rootUrl={rootUrl} />
              )
            }
          />
        ))}
      </PageLayout>
      <Route path='*'>
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default Router;
