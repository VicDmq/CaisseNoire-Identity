// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { type RouteProps } from './routes';

const Router = ({ routes }: { routes: RouteProps[] }) => {
  return (
    <Switch>
      {routes.map(({ path, component }: RouteProps, i) => (
        <Route key={i} exact path={path} component={component} />
      ))}
    </Switch>
  );
};

export default Router;
