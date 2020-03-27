// @flow
import React from 'react';
import { render } from 'react-dom';
import App from '@Providers';

import './styles/app.less';

// $FlowFixMe: getElementById can return null
render(<App />, document.getElementById('app'));
