// @flow
import { SanctionsPage } from '@Pages';
import { NotFoundPage } from './NotFound';

export type RouteProps = {
  path: string,
  component: any,
};

const routes: RouteProps[] = [
  {
    path: '/sanctions',
    component: SanctionsPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
