// @flow
import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import { Row, Col, Tabs, Icon } from 'antd';

import env from '@Utils/env';
import type { Response, Reason } from '@Components/utils/Connect';
import type { ApiProps } from '../providers/RouterProvider/routes';
import CreateSanctionForm from './CreateSanction/CreateSanction';
import SanctionList from './SanctionList/SanctionList';
import SanctionTable from './SanctionTable/SanctionTable';

import STYLES from './styles.less';

const { TabPane } = Tabs;

const Sanctions = ({
  teamFetch,
  usersFetch,
  sanctionsFetch,
  postSanctions,
  deleteSanction,
  isAdmin,
}: {
  teamFetch: Response<Team>,
  usersFetch: Response<User[]>,
  sanctionsFetch: ?Response<Sanction[]>,
  postSanctions: (CreateSanction[], (Sanction[]) => void, (Reason) => void) => void,
  deleteSanction: (Uuid, () => void, (Reason) => void) => void,
  isAdmin: boolean,
}) => {
  return (
    <Tabs tabBarStyle={{ display: 'flex', justifyContent: 'center' }}>
      <TabPane
        tab={
          <span>
            <Icon type='plus-circle' theme='filled' />
            Créer
          </span>
        }
        key='1'
      >
        <Row>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
            <Row type='flex' justify='center' align='middle' className={STYLES.formContainer}>
              <CreateSanctionForm
                response={PromiseState.all([teamFetch, usersFetch])}
                mapResponseToProps={([team, users]) => ({
                  team,
                  users,
                })}
                createSanctions={postSanctions}
                isAdmin={isAdmin}
              />
            </Row>
          </Col>
        </Row>
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type='unordered-list' />
            Liste
          </span>
        }
        key='2'
      >
        <Row>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
            <Row type='flex' justify='center' align='middle'>
              <SanctionList
                response={PromiseState.all([teamFetch, usersFetch, sanctionsFetch || { refreshing: true }])}
                mapResponseToProps={([team, users, sanctions]) => ({
                  team,
                  users,
                  sanctions,
                })}
                deleteSanction={deleteSanction}
                isAdmin={isAdmin}
              />
            </Row>
          </Col>
        </Row>
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type='unordered-list' />
            Tableau
          </span>
        }
        key='3'
      >
        <Row>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
            <Row type='flex' justify='center' align='middle'>
              <SanctionTable
                response={PromiseState.all([teamFetch, usersFetch, sanctionsFetch || { refreshing: true }])}
                mapResponseToProps={([team, users, sanctions]) => ({ team, users, sanctions })}
              />
            </Row>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
};

export default connect(({ teamId }: ApiProps) => {
  const rootUrl = env.getApiUrl();
  const sanctionsUrl = `${rootUrl}/teams/${teamId}/sanctions`;

  return {
    teamFetch: `${rootUrl}/teams/${teamId}`,
    usersFetch: {
      url: `${rootUrl}/teams/${teamId}/users`,
      andThen: () => ({
        sanctionsFetch: sanctionsUrl,
      }),
    },
    postSanctions: (sanctions: CreateSanction[], cb: (Sanction[]) => void, errCb: (Reason) => void) => ({
      createdSanction: {
        url: `${rootUrl}/teams/${teamId}/sanctions`,
        method: 'POST',
        force: true,
        body: JSON.stringify(sanctions),
        then: (sanctions) => cb(sanctions),
        catch: (reason) => errCb(reason),
        andThen: () => ({
          sanctionsFetch: {
            url: sanctionsUrl,
            refreshing: true,
            force: true,
          },
        }),
      },
    }),
    deleteSanction: (sanction_id: Uuid, cb: () => void, errCb: () => void) => ({
      deletedSanction: {
        url: `${rootUrl}/teams/${teamId}/sanctions/${sanction_id}`,
        method: 'DELETE',
        then: () => cb(),
        catch: () => errCb(),
        andThen: () => ({
          sanctionsFetch: {
            url: sanctionsUrl,
            refreshing: true,
            force: true,
          },
        }),
      },
    }),
  };
})(Sanctions);
