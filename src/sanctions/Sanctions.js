// @flow
import React, { useState } from 'react'
import { connect, PromiseState } from 'react-refetch'
import { useCookies } from 'react-cookie'
import { Row, Col } from 'antd'

import type { Response, Reason } from '@Components/utils/Connect'
import CreateSanctionForm from './CreateSanction/CreateSanction'
import type { ApiProps } from '../routing/routes'

import STYLES from './sanctions.less'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const Sanctions = ({
  teamFetch,
  usersFetch,
  postSanction
}: {
  teamFetch: Response<Team>,
  usersFetch: Response<User[]>,
  postSanction: (CreateSanction, (Sanction) => void, (Reason) => void) => void
}) => {
  return (
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
          />
        </Row>
      </Col>
    </Row>
  )
}

export default connect(({ teamId, rootUrl }: ApiProps) => {
  return {
    teamFetch: `${rootUrl}/teams/${teamId}`,
    usersFetch: `${rootUrl}/teams/${teamId}/users`,
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
