import React from 'react';

import Router from './Router';
import routes from './routes';

const withRoutes = (WrappedComponent) => ({ rootUrl }) => {
  return <WrappedComponent routes={routes} rootUrl={rootUrl} />;
};

export default withRoutes(Router);
