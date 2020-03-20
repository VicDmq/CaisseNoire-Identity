// @flow
import { connect } from 'react-refetch';

import Login from './Login';
import env from '@Utils/env';

const requests = () => ({
  login: (request: LoginRequest, cb: (LoginResponse) => void) => ({
    loginResponse: {
      url: `${env.getApiUrl()}/login`,
      method: 'POST',
      force: true,
      body: JSON.stringify(request),
      then: (response) => cb(response),
    },
  }),
});

export default connect(requests)(Login);
