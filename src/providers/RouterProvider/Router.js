// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { type RouteProps } from './routes';

const Router = ({ rootUrl, routes }: { rootUrl: string, routes: RouteProps[] }) => {
  const [cookies] = useCookies<CookieProps, SessionProps>(['session']);

  return (
    <Switch>
      {routes.map((route: RouteProps, i) => (
        <Route
          key={i}
          exact
          path={route.path}
          render={() => (
            <route.component teamId={cookies.session.teamId} isAdmin={cookies.session.isAdmin} rootUrl={rootUrl} />
          )}
        />
      ))}
    </Switch>
  );
};

export default Router;
