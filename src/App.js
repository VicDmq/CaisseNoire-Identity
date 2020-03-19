// @flow
import React from 'react';
import { render } from 'react-dom';
import {
  CookiesProvider,
  BrowserRouter,
  AntdProvider,
  AuthProvider,
  LayoutProvider,
  RouterProvider,
} from './providers';

import './styles/app.less';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || '';

const App = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AntdProvider>
          <AuthProvider rootUrl={REACT_APP_API_URL}>
            <LayoutProvider>
              <RouterProvider rootUrl={REACT_APP_API_URL} />
            </LayoutProvider>
          </AuthProvider>
        </AntdProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
};

// $FlowFixMe: getElementById can return null
render(<App />, document.getElementById('app'));
