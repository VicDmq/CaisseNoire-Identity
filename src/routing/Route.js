// @flow
import React from 'react';
import { Layout } from 'antd';

import Header from './Header/Header';

import type { RouteProps } from './routes';
import type { SessionProps } from './Router';

const { Content } = Layout;

type CustomRouteProps = {
  route: RouteProps,
  session: SessionProps,
  rootUrl: string,
  deleteSession: () => void,
};

const CustomRoute = ({ route, session, rootUrl, deleteSession }: CustomRouteProps) => {
  return (
    <Layout>
      <Header deleteSession={deleteSession} />
      <Content>
        <route.component teamId={session.teamId} isAdmin={session.isAdmin} rootUrl={rootUrl} />
      </Content>
    </Layout>
  );
};

export default CustomRoute;
