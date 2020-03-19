// @flow
import React, { type ChildrenArray } from 'react';
import { Layout as LayoutComponent } from 'antd';
import { Route } from 'react-router-dom';

import Navbar from './Navbar/Navbar';

const { Header, Content } = LayoutComponent;

type PageLayoutProps = {
  children: ChildrenArray<typeof Route>,
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <LayoutComponent>
      <Header>
        <Navbar />
      </Header>
      <Content>{children}</Content>
    </LayoutComponent>
  );
};

export default PageLayout;
