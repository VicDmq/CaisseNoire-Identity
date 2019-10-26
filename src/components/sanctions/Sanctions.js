// @flow
import React, { useState } from 'react'
import { connect, PromiseState } from 'react-refetch'
import type { Match } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'reactstrap'

import FetchComponent from '../common/FetchComponent'
import Select from '../common/Select'
import NumericInput from '../common/NumericInput'

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

const SanctionForm = ({ team, users }: { team: Team, users: User[] }) => {
  const [sanction, setSanction] = useState<CreateSanction>({
    team_id: team.id
  })

  const updateSanction = (sanction: CreateSanction) => {
    setSanction(sanction)
  }

  const saveSanction = () => {
    console.log(sanction)
  }

  const initializeSanctionData = (associated_rule: string): SanctionData => {
    const rule = team.rules.find(rule => rule.id === associated_rule)

    if (rule) {
      switch (rule.kind.type) {
        case 'MULTIPLICATION': {
          return { type: 'MULTIPLICATION', multiple: 1 }
        }
        case 'TIME_MULTIPLICATION': {
          return { type: 'TIME_MULTIPLICATION', times_unit: 1 }
        }
        default:
          break
      }
    }

    return { type: 'BASIC' }
  }

  const buttonIsDisabled = (): boolean => {
    return !sanction.user_id || !sanction.sanction_info
  }

  return (
    <Form>
      <SelectUser
        users={users}
        userId={sanction.user_id}
        updateSelectedUser={user_id =>
          updateSanction({
            ...sanction,
            user_id
          })
        }
      />
      <SelectRule
        rules={team.rules.filter(rule => rule.kind.type !== 'REGULAR_INTERVALS')}
        ruleId={sanction.sanction_info && sanction.sanction_info.associated_rule}
        updateSelectedRule={associated_rule =>
          updateSanction({
            ...sanction,
            sanction_info: {
              associated_rule,
              sanction_data: initializeSanctionData(associated_rule)
            }
          })
        }
      />
      <SanctionDataInput
        rule={team.rules.find(rule => rule.id === (sanction.sanction_info && sanction.sanction_info.associated_rule))}
        sanctionData={sanction.sanction_info && sanction.sanction_info.sanction_data}
        updateSanctionData={sanction_data =>
          updateSanction({
            ...sanction,
            sanction_info: {
              ...sanction.sanction_info,
              sanction_data
            }
          })
        }
      />
      <Button onClick={() => saveSanction()} disabled={buttonIsDisabled()}>
        Ça paye !
      </Button>
    </Form>
  )
}

const SelectUser = ({
  users,
  userId,
  updateSelectedUser
}: {
  users: User[],
  userId: ?Uuid,
  updateSelectedUser: Uuid => void
}) => {
  return (
    <Select
      label='Joueur sanctionné'
      value={userId}
      onChange={id => updateSelectedUser(id)}
      options={users.map(user => ({
        value: user.id,
        label: user.firstname + ' ' + user.lastname
      }))}
    />
  )
}

const RuleCategory: { [key: string]: string } = {
  TRAINING_DAY: 'Entrainement',
  GAME_DAY: 'Jour de match'
}

const SelectRule = ({
  rules,
  ruleId,
  updateSelectedRule
}: {
  rules: Rule[],
  ruleId: ?Uuid,
  updateSelectedRule: Uuid => void
}) => {
  return (
    <div>
      <Select
        label='Sanction à appliquer'
        value={ruleId}
        onChange={id => updateSelectedRule(id)}
        options={rules.map(rule => ({
          value: rule.id,
          label: rule.name + ' (' + RuleCategory[rule.category] + ')'
        }))}
      />
    </div>
  )
}

const SanctionDataInput = ({
  rule,
  sanctionData,
  updateSanctionData
}: {
  rule: ?Rule,
  sanctionData: ?SanctionData,
  updateSanctionData: SanctionData => void
}) => {
  if (sanctionData) {
    switch (sanctionData.type) {
      case 'MULTIPLICATION': {
        return (
          <NumericInput
            label={'Information supplémentaires'}
            value={sanctionData && sanctionData.multiple}
            onChange={multiple =>
              updateSanctionData({
                type: 'MULTIPLICATION',
                multiple: multiple
              })
            }
            min={1}
          />
        )
      }
      case 'TIME_MULTIPLICATION': {
        return 'time multiplication'
      }
      default:
        break
    }
  }

  return null
}

export default connect(({ match }: { match: Match }) => {
  let team_id = match.params.team_id || ''
  let root_url = REACT_APP_API_URL || ''

  return {
    teamFetch: `${root_url}/teams/${team_id}`,
    usersFetch: `${root_url}/teams/${team_id}/users`
  }
})(SanctionsController)
