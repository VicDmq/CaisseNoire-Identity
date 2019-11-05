// @flow
import React, { type ComponentType, type Element } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Sanctions from '../sanctions/Sanctions'
import NavBar from './NavBar/NavBar'
import type { SessionProps } from './Router'

type RouteProps = {
  path: string,
  component: ComponentType<ApiProps>
}

export type ApiProps = {
  teamId: Uuid,
  rootUrl: string
}

const routes: RouteProps[] = [
  {
    path: '/sanctions',
    component: Sanctions
  }
]

const Routes = ({ session, rootUrl }: { session: ?SessionProps, rootUrl: string }): Element<typeof Route>[] => {
  return routes.map((route: RouteProps, i) => (
    <Route
      key={i}
      path={route.path}
      render={routeProps =>
        !session ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeProps.location.pathname }
            }}
          />
        ) : (
          <div style={{ height: '100%' }}>
            <NavBar />
            <route.component teamId={session.teamId} rootUrl={rootUrl} />
          </div>
        )
      }
    />
  ))
}

export default Routes
