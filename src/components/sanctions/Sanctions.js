// @flow
import React, { useState } from 'react'
import { connect, PromiseState } from 'react-refetch'
import type { Match } from 'react-router-dom'
import { Container, Row, Col, Form } from 'reactstrap'

import FetchComponent from '../common/FetchComponent'
import Select from '../common/Select'

import STYLES from './sanction.scss'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const SanctionForm = ({
  teamFetch,
  usersFetch
}: {
  teamFetch: Response<Team>,
  usersFetch: Response<User[]>,
}) => {
  return (
    <Container>
      <Row>
        <Col xs={{ size: 6, offset: 3 }} className={STYLES.form}>
          <FetchComponent
            response={PromiseState.all([teamFetch, usersFetch])}
            render={([team, users]) => (
              <SanctionFormBody team={team} users={users} />
            )}
          />
        </Col>
      </Row>
    </Container>
  )
}

const SanctionFormBody = ({ team, users }: { team: Team, users: User[] }) => {
  const [userSelected, setUserSelected] = useState<?string>()

  return (
    <Form>
      <Select
        label='Joueur'
        value={userSelected}
        onChange={id => setUserSelected(id)}
      >
        {users.map(user => (
          <option key={user.id} value={user.id}>{`${user.firstname} ${
            user.lastname
          }`}</option>
        ))}
      </Select>
    </Form>
  )
}

export default connect(({ match }: { match: Match }) => {
  let team_id = match.params.team_id || ''
  let root_url = REACT_APP_API_URL || ''

  return {
    teamFetch: `${root_url}/teams/${team_id}`,
    usersFetch: `${root_url}/teams/${team_id}/users`
  }
})(SanctionForm)
