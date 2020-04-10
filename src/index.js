// @flow
import React from 'react';
import { render } from 'react-dom';
import App from '@Providers/AppProvider';

import './styles/app.less';

const app = document.getElementById('app');

if (app) {
  render(<App />, app);
} else {
  throw new Error('#app not defined');
}
