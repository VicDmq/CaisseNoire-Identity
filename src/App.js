// @flow
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/fr_FR';

import Router from './routing/Router';

import './styles/app.less';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || '';

const App = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <ConfigProvider locale={locale}>
          <Router rootUrl={REACT_APP_API_URL} />
        </ConfigProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
};

// $FlowFixMe: getElementById can return null
render(<App />, document.getElementById('app'));
