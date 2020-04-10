// @flow
import React, { type Node } from 'react';
import { useCookies } from 'react-cookie';

import env from '@Utils/env';

type Props = {|
  children: Node,
|};

const withBaseUrl = (WrappedComponent: any) => (props: Props) => {
  const [cookies] = useCookies<CookieProps, SessionProps>(['session']);

  const rootUrl = env.getApiUrl();
  const teamId = cookies.session.teamId;

  const baseUrl = `${rootUrl}/teams/${teamId}`;

  return <WrappedComponent baseUrl={baseUrl} {...props} />;
};

export default withBaseUrl;
