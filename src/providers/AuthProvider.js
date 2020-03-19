// @flow
import React, { type ComponentType } from 'react';
import { useCookies } from 'react-cookie';

import Login from '@Pages/Login';

type CookieProps = {
  session: SessionProps,
};

type SessionProps = {
  teamId: Uuid,
  isAdmin: boolean,
};

type AuthProviderProps = {
  rootUrl: string,
  children: ComponentType<{ rootUrl: string }>,
};

const AuthProvider = ({ rootUrl, children }: AuthProviderProps) => {
  const [cookies, setCookie] = useCookies<CookieProps, SessionProps>(['session']);

  const setSession = (teamId: Uuid, isAdmin: boolean) => {
    setCookie('session', { teamId, isAdmin }, { path: '/' });
  };

  if (!cookies.session) {
    return <Login rootUrl={rootUrl} setSession={setSession} />;
  } else {
    return children;
  }
};

export default AuthProvider;
