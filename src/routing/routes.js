// @flow
import type { ComponentType } from 'react'
import Sanctions from '../sanctions/Sanctions'

export type RouteProps = {
  path: string,
  component: ComponentType<ApiProps>
}

export type ApiProps = {
  teamId: Uuid,
  rootUrl: string
}

export const routes: RouteProps[] = [
  {
    path: '/sanctions',
    component: Sanctions
  }
]
