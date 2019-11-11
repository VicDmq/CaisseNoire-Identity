// @flow
import React, { useState } from 'react'
import { connect, PromiseState } from 'react-refetch'
import { useCookies } from 'react-cookie'
import { Row, Col, Tabs } from 'antd'

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
  isAdmin
}: {
  teamFetch: Response<Team>,
  usersFetch: Response<User[]>,
  sanctionsFetch: Response<Sanction[]>,
  postSanction: (CreateSanction, (Sanction) => void, (Reason) => void) => void,
  isAdmin: boolean
}) => {
  return (
    <Tabs defaultActiveKey='2'>
      <TabPane tab={<span>Nouvelle sanction</span>} key='1'>
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
      <TabPane tab={<span>Sanctions</span>} key='2'>
        <Row>
          <Col xs={{ span: 18, offset: 3 }} lg={{ span: 12, offset: 6 }}>
            <Row type='flex' justify='center' align='middle'>
              <SanctionsList
                response={PromiseState.all([teamFetch, usersFetch, sanctionsFetch])}
                mapResponseToProps={([team, users, sanctions]) => ({ team, users, sanctions })}
              />
            </Row>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  )
}

export default connect(({ teamId, rootUrl }: ApiProps) => {
  return {
    teamFetch: `${rootUrl}/teams/${teamId}`,
    usersFetch: `${rootUrl}/teams/${teamId}/users`,
    sanctionsFetch: `${rootUrl}/teams/${teamId}/sanctions`,
    postSanction: (sanction: CreateSanction, cb: Sanction => void, errCb: Reason => void) => ({
      createSanction: {
        url: `${rootUrl}/teams/${teamId}/sanctions`,
        method: 'POST',
        force: true,
        body: JSON.stringify(sanction),
        then: sanction => cb(sanction),
        catch: reason => errCb(reason)
      }
    })
  }
})(Sanctions)
