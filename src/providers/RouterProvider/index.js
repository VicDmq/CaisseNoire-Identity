// @flow
import React from 'react';

import Router from './Router';
import routes from './routes';

const withRoutes = (WrappedComponent) => () => {
  return <WrappedComponent routes={routes} />;
};

export default withRoutes(Router);
