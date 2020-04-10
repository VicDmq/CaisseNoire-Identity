// @flow
import { connect } from 'react-refetch';

import { withBaseUrlHOC } from '@HOC';
import Sanctions from './Sanctions';

const requests = ({ baseUrl }) => ({
  sanctionsFetch: baseUrl + '/sanctions',
  postSanctions: (sanctions: CreateSanction[], cb: (Sanction[]) => void, errCb: (Reason) => void) => ({
    createdSanction: {
      url: baseUrl + '/sanctions',
      method: 'POST',
      force: true,
      body: JSON.stringify(sanctions),
      then: (sanctions) => cb(sanctions),
      catch: (reason) => errCb(reason),
      andThen: () => ({
        sanctionsFetch: {
          url: baseUrl + '/sanctions',
          refreshing: true,
          force: true,
        },
      }),
    },
  }),
  deleteSanction: (sanction_id: Uuid, cb: () => void, errCb: () => void) => ({
    deletedSanction: {
      url: `${baseUrl}/sanctions/${sanction_id}`,
      method: 'DELETE',
      then: () => cb(),
      catch: () => errCb(),
      andThen: () => ({
        sanctionsFetch: {
          url: baseUrl + '/sanctions',
          refreshing: true,
          force: true,
        },
      }),
    },
  }),
});

export default withBaseUrlHOC(connect(requests)(Sanctions));
