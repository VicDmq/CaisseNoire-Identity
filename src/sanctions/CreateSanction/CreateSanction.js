// @flow
import React, { useState } from 'react'
import { Row, Form, message, Button } from 'antd'

import withConnect, { type Reason } from '@Components/utils/Connect'
import SelectUsers from './SelectUsers'
import SelectRules from './SelectRules'
import ExtraInfoInputs from './ExtraInfoInputs'

import STYLES from './styles.less'

type DataProps = {
  team: Team,
  users: User[]
}

type OtherProps = {
  createSanction: (CreateSanction, (Sanction) => void, (Reason) => void) => void,
  isAdmin: boolean
}

type CreateSanctionProps = DataProps & OtherProps

export type ComparisonResult = 'LESS' | 'MORE' | 'SAME'

export const USERS_COMPARED_TO_RULES: { [key: any]: ComparisonResult } = {
  MORE: 'MORE',
  LESS: 'LESS',
  SAME: 'SAME'
}

export const SanctionForm = ({ team, users, createSanction, isAdmin }: CreateSanctionProps) => {
  const [selectedUsers, setSelectedUsers] = useState<Uuid[]>([])
  const [selectedRules, setSelectedRules] = useState<Uuid[]>([])
  const [state, setState] = useState<[User, Rule, CreateSanction][]>([])
  const [creatingSanctions, setCreatingSanctions] = useState<boolean>(false)

  const getUser = (id: Uuid): ?User => {
    return users.find(user => user.id === id)
  }

  const getRule = (id: Uuid): ?Rule => {
    return team.rules.find(rule => rule.id === id)
  }

  const getSanctions = (): CreateSanction[] => {
    return state.map(([user, rule, sanction]) => sanction)
  }

  const getSanction = (user_id: Uuid, rule_id: Uuid): ?CreateSanction => {
    let sanctionToReturn

    state.forEach(([user, rule, sanction]) => {
      if (user_id === user.id && rule_id === rule.id) {
        sanctionToReturn = sanction
      }
    })

    return sanctionToReturn
  }

  const getUsersComparedToRules = (): ComparisonResult => {
    if (selectedUsers.length > selectedRules.length) {
      return USERS_COMPARED_TO_RULES.MORE
    }

    if (selectedUsers.length < selectedRules.length) {
      return USERS_COMPARED_TO_RULES.LESS
    }

    return USERS_COMPARED_TO_RULES.SAME
  }

  const initializeExtraInfo = (rule: Rule): ExtraInfo => {
    switch (rule.kind.type) {
      case 'MULTIPLICATION':
      case 'TIME_MULTIPLICATION':
        return { type: 'MULTIPLICATION', factor: 1 }

      default:
        return { type: 'NONE' }
    }
  }

  const initializeSanction = (user: User, rule: Rule): CreateSanction => {
    return {
      user_id: user.id,
      sanction_info: {
        associated_rule: rule.id,
        extra_info: initializeExtraInfo(rule)
      }
    }
  }

  const updateState = (usersIdSelected: Uuid[], rulesIdSelected: Uuid[]) => {
    const newState: [User, Rule, CreateSanction][] = []
    const nbUsersSelected = usersIdSelected.length
    const nbRulesSelected = rulesIdSelected.length

    for (var i = 0; i < Math.max(nbUsersSelected, nbRulesSelected); i++) {
      let user
      let rule

      // Multiple Users
      if (nbUsersSelected > nbRulesSelected && nbRulesSelected > 0) {
        user = getUser(usersIdSelected[i])
        rule = getRule(rulesIdSelected[0])
      }
      // Multiple Rules
      else if (nbUsersSelected < nbRulesSelected && nbUsersSelected > 0) {
        user = getUser(usersIdSelected[0])
        rule = getRule(rulesIdSelected[i])
      }
      // Each is single
      else if (nbUsersSelected > 0 && nbRulesSelected > 0) {
        user = getUser(usersIdSelected[0])
        rule = getRule(rulesIdSelected[0])
      }

      if (user && rule) {
        const sanction = getSanction(user.id, rule.id) || initializeSanction(user, rule)
        newState.push([user, rule, sanction])
      }
    }

    setState(newState)
  }

  const updateSelectedUsers = (value: Uuid[]) => {
    setSelectedUsers(value)
    // To Refactor
    updateState(value, selectedRules)
  }

  const updateSelectedRules = (value: Uuid[]) => {
    setSelectedRules(value)
    // To Refactor
    updateState(selectedUsers, value)
  }

  const updateSanction = (index: number, extraInfo: ExtraInfo) => {
    let stateCopy = [...state]
    stateCopy[index][2].sanction_info.extra_info = extraInfo

    setState(stateCopy)
  }

  const getSuccessAlertText = (sanction: Sanction): string => {
    const user = users.find(user => user.id === sanction.user_id)

    if (user) {
      return `${user.firstname} ${user.lastname} a payé ${sanction.price}`
    }

    return ''
  }

  const getErrorAlertText = (error: ?ApiError): string => {
    if (error) {
      switch (error.kind) {
        case 'NOT_FOUND':
        case 'BAD_REFERENCE': {
          return "Une des ressources utilisées n'existe pas : rechargez la page "
        }
        default: {
          break
        }
      }
    }

    return "Une erreur inconnue s'est produite lors de la sauvegarde"
  }

  const saveSanction = () => {
    setCreatingSanctions(true)

    getSanctions().forEach(sanction => {
      createSanction(
        sanction,
        sanction => {
          message.success(getSuccessAlertText(sanction))
          // Todo RESET
          setCreatingSanctions(false)
        },
        reason => {
          message.error(getErrorAlertText(reason.cause))
          setCreatingSanctions(false)
        }
      )
    })
  }

  const buttonIsDisabled: boolean = state.length === 0

  return (
    <Form colon={false} className={STYLES.form}>
      <SelectUsers
        users={users}
        selectedUsers={selectedUsers}
        updateSelectedUsers={updateSelectedUsers}
        disabled={!isAdmin}
        isMultiple={selectedRules.length <= 1}
      />
      <SelectRules
        rules={team.rules}
        selectedRules={selectedRules}
        updateSelectedRules={updateSelectedRules}
        disabled={!isAdmin}
        isMultiple={selectedUsers.length <= 1}
      />
      <ExtraInfoInputs
        formState={state}
        updateSanction={updateSanction}
        usersComparedToRules={getUsersComparedToRules()}
      />
      <Row type='flex' justify='center'>
        <Button
          type='primary'
          onClick={saveSanction}
          disabled={buttonIsDisabled}
          loading={creatingSanctions}
          className={STYLES.saveButton}
        >
          {creatingSanctions ? '' : 'Ça paye !'}
        </Button>
      </Row>
    </Form>
  )
}

export default withConnect<DataProps, OtherProps>(SanctionForm)
