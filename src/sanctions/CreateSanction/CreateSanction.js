// @flow
import React, { useState } from 'react'
import { Row, Form, message, Button } from 'antd'

import withConnect, { type Reason } from '@Components/utils/Connect'
import SelectUsers from './SelectUsers'
import SelectRules from './SelectRules'
import ExtraInfoInput from './ExtraInfoInput'

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

export const SanctionForm = ({ team, users, createSanction, isAdmin }: CreateSanctionProps) => {
  const [selectedUsers, setSelectedUsers] = useState<Uuid[]>([])
  const [selectedRules, setSelectedRules] = useState<Uuid[]>([])
  const [sanction, setSanction] = useState<CreateSanction>({})
  const [creatingSanction, setCreatingSanction] = useState<boolean>(false)

  const updateSanction = (sanction: CreateSanction) => {
    setSanction(sanction)
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
    setCreatingSanction(true)

    createSanction(
      sanction,
      sanction => {
        message.success(getSuccessAlertText(sanction))
        setSanction({})
        setCreatingSanction(false)
      },
      reason => {
        message.error(getErrorAlertText(reason.cause))
        setCreatingSanction(false)
      }
    )
  }

  const initializeExtraInfo = (associated_rule: string): ExtraInfo => {
    const rule = team.rules.find(rule => rule.id === associated_rule)

    if (rule) {
      switch (rule.kind.type) {
        case 'MULTIPLICATION':
        case 'TIME_MULTIPLICATION':
          return { type: 'MULTIPLICATION', factor: 1 }

        default:
          break
      }
    }

    return { type: 'NONE' }
  }

  const getRuleKind = (): ?RuleKind => {
    const rule = team.rules.find(rule => rule.id === (sanction.sanction_info && sanction.sanction_info.associated_rule))

    return rule ? rule.kind : undefined
  }

  const buttonIsDisabled: boolean = !sanction.user_id || !sanction.sanction_info
  console.log(selectedRules)
  console.log(`Hey ${(selectedRules.length > 1).toString()}`)
  return (
    <Form colon={false} className={STYLES.form}>
      <SelectUsers
        users={users}
        selectedUsers={selectedUsers}
        updateSelectedUsers={setSelectedUsers}
        disabled={!isAdmin}
        blockMultiple={selectedRules.length > 1}
      />
      <SelectRules
        rules={team.rules}
        selectedRules={selectedRules}
        updateSelectedRules={setSelectedRules}
        disabled={!isAdmin}
        blockMultiple={selectedUsers.length > 1}
      />
      <ExtraInfoInput
        selectedUsers={users.filter(user => selectedUsers.includes(user.id))}
        ruleKind={getRuleKind()}
        extraInfo={sanction.sanction_info && sanction.sanction_info.extra_info}
        updateExtraInfo={extra_info =>
          updateSanction({
            ...sanction,
            sanction_info: {
              ...sanction.sanction_info,
              extra_info
            }
          })
        }
      />
      <Row type='flex' justify='center'>
        <Button
          type='primary'
          onClick={saveSanction}
          disabled={buttonIsDisabled}
          loading={creatingSanction}
          className={STYLES.saveButton}
        >
          {creatingSanction ? '' : 'Ça paye !'}
        </Button>
      </Row>
    </Form>
  )
}

export default withConnect<DataProps, OtherProps>(SanctionForm)
