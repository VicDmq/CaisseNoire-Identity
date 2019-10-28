// @flow
import React, { useState } from 'react'
import { connect, PromiseState } from 'react-refetch'
import type { Match } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import CreateSanctionForm from './CreateSanction'

// // $FlowFixMe: getElementById can return null
import STYLES from './Sanction.less'

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
    <Container>
      <Row>
        <Col xs={{ size: 6, offset: 3 }} className={STYLES.form}>
          <CreateSanctionForm
            response={PromiseState.all([teamFetch, usersFetch])}
            mapResponseToProps={([team, users]) => ({
              team,
              users
            })}
            createSanction={postSanction}
          />
        </Col>
      </Row>
    </Container>
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
