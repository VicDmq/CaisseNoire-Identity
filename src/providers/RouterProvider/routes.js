// @flow
import type { ComponentType } from 'react';
import Sanctions from '@Pages/Sanctions';
import NotFound from '@Pages/NotFound';

export type ApiProps = {
  teamId: Uuid,
  isAdmin: boolean,
};

export type RouteProps = {
  path: string,
  component: ComponentType<ApiProps>,
};

const routes: RouteProps[] = [
  {
    path: '/sanctions',
    component: Sanctions,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
