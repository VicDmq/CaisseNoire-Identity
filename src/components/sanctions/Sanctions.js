// @flow
import React, { useState } from 'react'
import { connect, PromiseState } from 'react-refetch'
import type { Match } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

import { FetchComponent, type Response } from '../common/FetchComponent'
import Select from '../common/Select'

import STYLES from './sanction.scss'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

type FormProps = {
  match: Match,
  teamFetch: Response<Team>,
  usersFetch: Response<User[]>,
}

const SanctionForm = (props: FormProps) => {
  return (
    <Container>
      <Row>
        <Col xs={{ size: 6, offset: 3 }} className={STYLES.form}>
          <FetchComponent
            response={PromiseState.all([props.teamFetch, props.usersFetch])}
            render={([team, users]) => (
              <SanctionFormBody team={team} users={users} />
            )}
          />
        </Col>
      </Row>
    </Container>
  )
}

type FormBodyProps = {
  team: Team,
  users: User[],
}

const SanctionFormBody = (props: FormBodyProps) => {
  const [userSelected, setUserSelected] = useState<?string>()

  return (
    <Form>
      <FormGroup>
        <Label>Choisir le vilain :</Label>
        <Input
          type='select'
          value={userSelected}
          onChange={v => {
            console.log(v.target.value)
            setUserSelected(v.target.value)
          }}
        >
          {props.users.map(user => (
            <option key={user.id} value={user.id}>{`${user.firstname} ${
              user.lastname
            }`}</option>
          ))}
        </Input>
      </FormGroup>
      <Select
        label={'Hey'}
        value={userSelected}
        onChange={id => setUserSelected(id)}
      >
        {[].map(user => (
          <option key={user.id} value={user.id}>{`${user.firstname} ${
            user.lastname
          }`}</option>
        ))}
      </Select>
    </Form>
  )
}

export default connect((props: FormProps) => {
  let team_id = props.match.params.team_id || ''
  let root_url = REACT_APP_API_URL || ''

  return {
    teamFetch: `${root_url}/teams/${team_id}`,
    usersFetch: `${root_url}/teams/${team_id}/users`
  }
})(SanctionForm)
