// @flow
import React from 'react';
import { render } from 'react-dom';
import App from './providers';

import './styles/app.less';

// $FlowFixMe: getElementById can return null
render(<App />, document.getElementById('app'));
