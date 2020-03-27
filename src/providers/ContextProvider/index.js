// @flow
import React from 'react';
import { connect } from 'react-refetch';
import { useCookies } from 'react-cookie';

import env from '@Utils/env';
import ContextProvider from './ContextProvider';

const requests = ({ rootUrl, teamId }) => {
  return {
    teamFetch: {
      url: `${rootUrl}/teams/${teamId}`,
      refreshInterval: 10000,
    },
    usersFetch: {
      url: `${rootUrl}/teams/${teamId}/users`,
      refreshInterval: 10000,
    },
  };
};

const withTeamId = (WrappedComponent) => (props) => {
  const [cookies] = useCookies<CookieProps, SessionProps>(['session']);

  const rootUrl = env.getApiUrl();
  const teamId = cookies.session.teamId;

  return <WrappedComponent teamId={teamId} rootUrl={rootUrl} {...props} />;
};

const withRequests = connect(requests)(ContextProvider);

export default withTeamId(withRequests);
