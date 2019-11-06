// @flow
import type { ComponentType } from 'react'
import Sanctions from '../sanctions/Sanctions'

export type ApiProps = {
  teamId: Uuid,
  isAdmin: boolean,
  rootUrl: string
}

export type RouteProps = {
  path: string,
  component: ComponentType<ApiProps>
}

export const routes: RouteProps[] = [
  {
    path: '/sanctions',
    component: Sanctions
  }
]
