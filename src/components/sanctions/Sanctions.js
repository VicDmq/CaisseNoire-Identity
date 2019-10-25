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
  const [userId, setUserId] = useState<?string>()
  const [ruleId, setRuleId] = useState<?string>()

  return (
    <Form>
      <Select
        label='Joueur sanctionné'
        value={userId}
        onChange={id => setUserId(id)}
        options={users.map(user => ({
          value: user.id,
          label: user.firstname + ' ' + user.lastname
        }))}
      />
      <Select
        label='Sanction à appliquer'
        value={ruleId}
        onChange={id => setRuleId(id)}
        options={team.rules.map(rule => ({
          value: rule.id,
          label: rule.name + ' (' + rule.category + ')'
        }))}
      />
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
