// @flow
import React, { type ComponentType, type Element } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import Header from './Header/Header'
import type { SessionProps } from './Router'
import Sanctions from '../sanctions/Sanctions'

export type ApiProps = {
  teamId: Uuid,
  rootUrl: string
}

type RouteProps = {
  path: string,
  component: ComponentType<ApiProps>
}

const routes: RouteProps[] = [
  {
    path: '/sanctions',
    component: Sanctions
  }
]

const { Content } = Layout

const Routes = ({
  session,
  rootUrl,
  deleteSession
}: {
  session: ?SessionProps,
  rootUrl: string,
  deleteSession: () => void
}): Element<typeof Route>[] => {
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
          <Layout>
            <Header deleteSession={deleteSession} />
            <Content>
              <route.component teamId={session.teamId} rootUrl={rootUrl} />
            </Content>
          </Layout>
        )
      }
    />
  ))
}

export default Routes
