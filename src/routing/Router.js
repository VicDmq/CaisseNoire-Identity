// @flow
import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { routes, type RouteProps } from './routes'
import Login from './Login/Login'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || ''

type CookieProps = {
  session: SessionProps
}

export type SessionProps = {
  teamId: Uuid,
  isAdmin: boolean
}

const Router = () => {
  const [cookies, setCookie, removeCookie] = useCookies<CookieProps, SessionProps>(['session'])

  const setCookieValue = (teamId: Uuid, isAdmin: boolean) => {
    setCookie('session', { teamId, isAdmin }, { path: '/' })
  }

  return (
    <Switch>
      <Route exact path='/' render={() => <Login rootUrl={REACT_APP_API_URL} setCookie={setCookieValue} />} />
      {routes.map((route: RouteProps, i) => (
        <Route
          key={i}
          path={route.path}
          render={routeProps =>
            !cookies.session ? (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: routeProps.location.pathname }
                }}
              />
            ) : (
              <route.component teamId={cookies.session.teamId} rootUrl={REACT_APP_API_URL} />
            )
          }
        />
      ))}
    </Switch>
  )
}

export default Router
