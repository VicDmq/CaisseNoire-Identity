// @flow
import { connect } from 'react-refetch';

import { withBaseUrlHOC } from '@HOC';
import ContextProvider from './ContextProvider';

const requests = ({ baseUrl }) => ({
  teamFetch: {
    url: baseUrl,
    refreshInterval: 10000,
  },
  usersFetch: {
    url: baseUrl + '/users',
    refreshInterval: 10000,
  },
});

export { TeamContext } from './ContextProvider';
export default withBaseUrlHOC(connect(requests)(ContextProvider));
