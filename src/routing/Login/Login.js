// @flow
import React from 'react';
import { connect } from 'react-refetch';
import { useHistory } from 'react-router-dom';

import type { Response } from '@Components/utils/Connect';
import LoginForm from './LoginForm';

type LoginProps = {
  setSession: (Uuid, boolean) => void,
  login: (LoginRequest, (LoginResponse) => void) => void,
  loginResponse: ?Response<LoginResponse>,
};

const Login = (props: LoginProps) => {
  const history = useHistory();

  const tryToLogIn = (credentials: LoginRequest) => {
    props.login(credentials, (response) => onSuccess(response));
  };

  const onSuccess = (response: LoginResponse) => {
    props.setSession(response.id, !!response.admin_password);
    let { from } = history.location.state || { from: '/sanctions' };
    history.push({ pathname: from });
  };

  return <LoginForm signIn={tryToLogIn} response={props.loginResponse} />;
};

export default connect(({ rootUrl }: { rootUrl: string }) => {
  return {
    login: (request: LoginRequest, cb: (LoginResponse) => void) => ({
      loginResponse: {
        url: `${rootUrl}/login`,
        method: 'POST',
        force: true,
        body: JSON.stringify(request),
        then: (response) => cb(response),
      },
    }),
  };
})(Login);
