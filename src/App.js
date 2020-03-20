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

const App = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AntdProvider>
          <AuthProvider>
            <LayoutProvider>
              <RouterProvider />
            </LayoutProvider>
          </AuthProvider>
        </AntdProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
};

// $FlowFixMe: getElementById can return null
render(<App />, document.getElementById('app'));
