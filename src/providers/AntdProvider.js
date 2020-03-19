// @flow
import React, { type Node } from 'react';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/fr_FR';

type AntdProviderProps = {
  children: Node,
};

const AntdProvider = ({ children }: AntdProviderProps) => {
  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};

export default AntdProvider;
