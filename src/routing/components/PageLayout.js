// @flow
import React, { type ChildrenArray } from 'react';
import { Layout as LayoutComponent } from 'antd';
import { Route } from 'react-router-dom';

import Navbar from './Navbar/Navbar';

const { Header, Content } = LayoutComponent;

type PageLayoutProps = {
  deleteSession: () => void,
  children: ChildrenArray<typeof Route>,
};

const PageLayout = ({ deleteSession, children }: PageLayoutProps) => {
  return (
    <LayoutComponent>
      <Header>
        <Navbar deleteSession={deleteSession} />
      </Header>
      <Content>{children}</Content>
    </LayoutComponent>
  );
};

export default PageLayout;
