// @flow
import { connect } from 'react-refetch';

import { withBaseUrlHOC } from '@HOC';
import ContextProvider from './ContextProvider';

const REFRESH_INTERVAL = 120 * 1000;

const requests = ({ baseUrl }) => ({
  teamFetch: {
    url: baseUrl,
    refreshInterval: REFRESH_INTERVAL,
  },
  usersFetch: {
    url: baseUrl + '/users',
    refreshInterval: REFRESH_INTERVAL,
  },
});

export { TeamContext } from './ContextProvider';
export default withBaseUrlHOC(connect(requests)(ContextProvider));
