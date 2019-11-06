// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { routes } from './routes'
import CustomRoute from './Route'
import Login from './Login/Login'
import PageNotFound from './PageNotFound'

type CookieProps = {
  session: SessionProps
}

export type SessionProps = {
  teamId: Uuid,
  isAdmin: boolean
}

const Router = ({ rootUrl }: { rootUrl: string }) => {
  const [cookies, setCookie, removeCookie] = useCookies<CookieProps, SessionProps>(['session'])

  const setSession = (teamId: Uuid, isAdmin: boolean) => {
    setCookie('session', { teamId, isAdmin }, { path: '/' })
  }

  const deleteSession = () => {
    removeCookie('session', {})
  }

  return (
    <Switch>
      <Route exact path='/'>
        <Login rootUrl={rootUrl} setSession={setSession} />
      </Route>
      {routes.map((route, i) => (
        <Route
          path={route.path}
          render={() =>
            !cookies.session ? (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: route.path }
                }}
              />
            ) : (
              <CustomRoute route={route} session={cookies.session} rootUrl={rootUrl} deleteSession={deleteSession} />
            )
          }
        />
      ))}
      <Route path='*'>
        <PageNotFound />
      </Route>
    </Switch>
  )
}

export default Router
