// @flow
import type { Node } from 'react';
import Sanctions from '@Pages/Sanctions';
import NotFound from '@Pages/NotFound';

export type RouteProps = {
  path: string,
  component: Node,
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
