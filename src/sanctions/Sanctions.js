// @flow
import React, { useState } from 'react'
import { connect, PromiseState } from 'react-refetch'
import type { Match } from 'react-router-dom'
import { Row, Col } from 'antd'

import CreateSanctionForm from './CreateSanction/CreateSanction.js'

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

export default connect(({ match }: { match: Match }) => {
  let team_id = match.params.team_id || ''
  let root_url = REACT_APP_API_URL || ''

  return {
    teamFetch: `${root_url}/teams/${team_id}`,
    usersFetch: `${root_url}/teams/${team_id}/users`,
    postSanction: (sanction: CreateSanction, cb: Sanction => void, errCb: Reason => void) => ({
      createSanction: {
        url: `${root_url}/teams/${team_id}/sanctions`,
        method: 'POST',
        body: JSON.stringify(sanction),
        then: sanction => cb(sanction),
        catch: reason => errCb(reason)
      }
    })
  }
})(Sanctions)
