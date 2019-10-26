// @flow
import React, { useState } from 'react'
import { connect, PromiseState } from 'react-refetch'
import type { Match } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'reactstrap'

import FetchComponent from '../common/FetchComponent'
import Select from '../common/Select'
import NumericInput from '../common/NumericInput'

import SanctionForm from './SanctionForm'

import STYLES from './sanction.scss'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const SanctionsController = ({
  teamFetch,
  usersFetch
}: {
  teamFetch: Response<Team>,
  usersFetch: Response<User[]>
}) => {
  return (
    <Container>
      <Row>
        <Col xs={{ size: 6, offset: 3 }} className={STYLES.form}>
          <FetchComponent
            response={PromiseState.all([teamFetch, usersFetch])}
            render={([team, users]) => <SanctionForm team={team} users={users} />}
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
    usersFetch: `${root_url}/teams/${team_id}/users`
  }
})(SanctionsController)
