// @flow
import React, { useContext } from 'react';
import { Row, Col, Tabs, Icon } from 'antd';

import { TeamContext } from '@Providers';
import CreateSanctionForm from './CreateSanction/CreateSanction';
import SanctionList from './SanctionList/SanctionList';
import SanctionTable from './SanctionTable/SanctionTable';

import STYLES from './styles.less';

const { TabPane } = Tabs;

const Sanctions = ({
  sanctionsFetch,
  postSanctions,
  deleteSanction,
}: {
  sanctionsFetch: Response<Sanction[]>,
  postSanctions: (CreateSanction[], (Sanction[]) => void, (Reason) => void) => void,
  deleteSanction: (Uuid, () => void, (Reason) => void) => void,
}) => {
  const { isAdmin, team, users } = useContext(TeamContext);

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
              <CreateSanctionForm team={team} users={users} createSanctions={postSanctions} isAdmin={isAdmin} />
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
                response={sanctionsFetch}
                mapResponseToProps={(sanctions) => ({ sanctions })}
                team={team}
                users={users}
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
                response={sanctionsFetch}
                mapResponseToProps={(sanctions) => ({ sanctions })}
                team={team}
                users={users}
              />
            </Row>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
};

export default Sanctions;
