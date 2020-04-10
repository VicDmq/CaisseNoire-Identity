// @flow
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

import AntdProvider from '../AntdProvider';
import AuthProvider from '../AuthProvider';
import ContextProvider from '../ContextProvider';
import LayoutProvider from '../LayoutProvider';
import RouterProvider from '../RouterProvider';

const App = () => (
  <AntdProvider>
    <AuthProvider>
      <ContextProvider>
        <LayoutProvider>
          <RouterProvider />
        </LayoutProvider>
      </ContextProvider>
    </AuthProvider>
  </AntdProvider>
);

const AppWithHooks = () => (
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
);

export default AppWithHooks;
