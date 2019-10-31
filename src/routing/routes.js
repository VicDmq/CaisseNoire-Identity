// @flow
import React, { type Element } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Login from './Login'
import Sanctions from '../sanctions/Sanctions'

type RouteProps = {
  path: string,
  isLogin?: boolean,
  component: any
}

const routes: RouteProps[] = [
  {
    path: '/login',
    isLogin: true,
    component: Login
  },
  {
    path: '/sanctions',
    exact: true,
    component: Sanctions
  }
]

const Router = () => {
  const [cookie, setCookie] = useCookies(['cookie'])

  const setCookieValue = (value: CookieProps) => {
    setCookie('cookie', value, { path: '/', httpOnly: true })
  }

  return (
    <Switch>
      {routes.map((route: RouteProps, i) => (
        <Route
          path={route.path}
          render={({ match }) =>
            cookie !== {} && !route.isLogin ? (
              <Redirect to={'/login'} from={route.path} />
            ) : (
              <route.component {...match} />
            )
          }
        />
      ))}
    </Switch>
  )
}

export default Router
