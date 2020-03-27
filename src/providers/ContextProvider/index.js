// @flow
import { connect } from 'react-refetch';

import { withBaseUrlHOC } from '@HOC';
import ContextProvider from './ContextProvider';

const requests = ({ baseUrl }) => {
  return {
    teamFetch: {
      url: baseUrl,
      refreshInterval: 10000,
    },
    usersFetch: {
      url: baseUrl + '/users',
      refreshInterval: 10000,
    },
  };
};

export default withBaseUrlHOC(connect(requests)(ContextProvider));
