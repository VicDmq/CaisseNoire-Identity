// @flow
import Login from './Login';
import { connect } from 'react-refetch';

const requests = ({ rootUrl }: { rootUrl: string }) => ({
  login: (request: LoginRequest, cb: (LoginResponse) => void) => ({
    loginResponse: {
      url: `${rootUrl}/login`,
      method: 'POST',
      force: true,
      body: JSON.stringify(request),
      then: (response) => cb(response),
    },
  }),
});

export default connect(requests)(Login);
