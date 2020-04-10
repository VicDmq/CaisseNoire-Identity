// @flow
import type { Node } from 'react';
import { SanctionsPage } from '@Pages';
import NotFound from './NotFound';

export type RouteProps = {
  path: string,
  component: Node,
};

const routes: RouteProps[] = [
  {
    path: '/sanctions',
    component: SanctionsPage,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
