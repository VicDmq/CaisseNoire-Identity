// @flow
import React, { useState } from 'react'
import { connect, PromiseState } from 'react-refetch'
import { useCookies } from 'react-cookie'
import { Row, Col, Tabs, Icon } from 'antd'

import type { Response, Reason } from '@Components/utils/Connect'
import CreateSanctionForm from './CreateSanction/CreateSanction'
import SanctionsList from './SanctionsList/SanctionsList'
import type { ApiProps } from '../routing/routes'

import STYLES from './sanctions.less'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const { TabPane } = Tabs

const Sanctions = ({
  teamFetch,
  usersFetch,
  sanctionsFetch,
  postSanction,
  deleteSanction,
  isAdmin
}: {
  teamFetch: Response<Team>,
  usersFetch: Response<User[]>,
  sanctionsFetch: ?Response<Sanction[]>,
  postSanction: (CreateSanction, (Sanction) => void, (Reason) => void) => void,
  deleteSanction: (Uuid, () => void, (Reason) => void) => void,
  isAdmin: boolean
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
          <Col xs={{ span: 18, offset: 3 }} lg={{ span: 12, offset: 6 }}>
            <Row type='flex' justify='center' align='middle' className={STYLES.formContainer}>
              <CreateSanctionForm
                response={PromiseState.all([teamFetch, usersFetch])}
                mapResponseToProps={([team, users]) => ({
                  team,
                  users
                })}
                createSanction={postSanction}
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
          <Col xs={{ span: 18, offset: 3 }} lg={{ span: 12, offset: 6 }}>
            <Row type='flex' justify='center' align='middle'>
              <SanctionsList
                response={PromiseState.all([teamFetch, usersFetch, sanctionsFetch || { refreshing: true }])}
                mapResponseToProps={([team, users, sanctions]) => ({ team, users, sanctions })}
                deleteSanction={deleteSanction}
                isAdmin={isAdmin}
              />
            </Row>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  )
}

export default connect(({ teamId, rootUrl }: ApiProps) => {
  const sanctionsUrl = `${rootUrl}/teams/${teamId}/sanctions`

  return {
    teamFetch: `${rootUrl}/teams/${teamId}`,
    usersFetch: {
      url: `${rootUrl}/teams/${teamId}/users`,
      andThen: () => ({
        sanctionsFetch: sanctionsUrl
      })
    },
    // sanctionsFetch: sanctionsUrl,
    postSanction: (sanction: CreateSanction, cb: Sanction => void, errCb: Reason => void) => ({
      createdSanction: {
        url: `${rootUrl}/teams/${teamId}/sanctions`,
        method: 'POST',
        force: true,
        body: JSON.stringify(sanction),
        then: sanction => cb(sanction),
        catch: reason => errCb(reason),
        andThen: () => ({
          sanctionsFetch: {
            url: sanctionsUrl,
            refreshing: true,
            force: true
          }
        })
      }
    }),
    deleteSanction: (sanction_id: Uuid, cb: () => void, errCb: () => void) => ({
      deletedSanction: {
        url: `${rootUrl}/teams/${teamId}/sanctions/${sanction_id}`,
        method: 'DELETE',
        then: () => cb(),
        catch: reason => errCb(),
        andThen: () => ({
          sanctionsFetch: {
            url: sanctionsUrl,
            refreshing: true,
            force: true
          }
        })
      }
    })
  }
})(Sanctions)
