// @flow
import React, { useContext, useState, Fragment } from 'react';
import { Row, Col, Tabs, Icon, Button, Modal, message } from 'antd';

import format from '@Utils/currency';
import { TeamContext } from '@Providers/ContextProvider';
import CreateSanctionForm from './CreateSanction';
import SanctionList from './SanctionList';
import SanctionTable from './SanctionTable';

import STYLES from './sanctions.less';

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
  const [createSanctionModalIsVisible, setCreateSanctionModalIsVisible] = useState<boolean>(false);

  const showCreateSanctionModal = () => {
    setCreateSanctionModalIsVisible(true);
  };

  const hideCreateSanctionModal = () => {
    setCreateSanctionModalIsVisible(false);
  };

  const onSaveSanctionsSucceeded = (sanctions: Sanction[]) => {
    const messageContent = (
      <div>
        {sanctions.map((sanction, i) => {
          const user = users.find((user) => user.id === sanction.user_id);

          if (user) {
            return (
              <div className={STYLES.messageText} key={i}>
                {user.firstname} {user.lastname} a payé {format(sanction.price)}
              </div>
            );
          }
        })}
      </div>
    );

    message.success(messageContent);
    hideCreateSanctionModal();
  };

  const onSaveSanctionsFailed = ({ cause: error }: Reason) => {
    let messageContent = "Une erreur inconnue s'est produite lors de la sauvegarde";

    if (error) {
      switch (error.kind) {
        case 'NOT_FOUND':
        case 'BAD_REFERENCE': {
          messageContent = "Une des ressources utilisées n'existe pas : rechargez la page ";
          break;
        }
        default: {
          break;
        }
      }
    }

    message.error(messageContent);
  };

  const saveSanctions = (sanctions: CreateSanction[]) => {
    return new Promise((resolve) => {
      postSanctions(
        sanctions,
        (sanctions) => {
          onSaveSanctionsSucceeded(sanctions);
          resolve(true);
        },
        (reason) => {
          onSaveSanctionsFailed(reason);
          resolve(false);
        },
      );
    });
  };

  const { isAdmin, team, users } = useContext(TeamContext);

  return (
    <Fragment>
      <Modal
        visible={createSanctionModalIsVisible}
        onCancel={hideCreateSanctionModal}
        title='Création de sanctions'
        centered={true}
        footer={null}
      >
        <CreateSanctionForm team={team} users={users} saveSanctions={saveSanctions} />
      </Modal>
      <div className={STYLES.sanctionsContainer}>
        <Tabs tabBarStyle={{ display: 'flex', justifyContent: 'center' }}>
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
        <Button
          type='primary'
          shape='circle'
          icon='plus'
          className={STYLES.createSanctionButton}
          onClick={showCreateSanctionModal}
          hidden={!isAdmin}
        />
      </div>
    </Fragment>
  );
};

export default Sanctions;
