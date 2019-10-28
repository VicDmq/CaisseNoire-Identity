// @flow
import React, { useState } from 'react'
import { Form, message, Button } from 'antd'

import withConnect from '../common/Connect'

import SelectUser from './SelectUser'
import SelectRule from './SelectRule'
import ExtraInfoInput from './ExtraInfoInput'

type DataProps = {
  team: Team,
  users: User[]
}

type OtherProps = {
  createSanction: (CreateSanction, (Sanction) => void, (Reason) => void) => void
}

const CreateSanctionForm = ({ team, users, createSanction }: DataProps & OtherProps) => {
  const [sanction, setSanction] = useState<CreateSanction>({})
  const [creating, setCreating] = useState<boolean>(false)

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

  const getErrorAlertText = (reason: Reason): string => {
    return 'Error'
  }

  const saveSanction = () => {
    setCreating(true)

    createSanction(
      sanction,
      sanction => {
        message.success(getSuccessAlertText(sanction))
        setSanction({})
        setCreating(false)
      },
      reason => {
        message.error(getErrorAlertText(reason))
        setCreating(false)
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

  const buttonIsDisabled: boolean = !sanction.user_id || !sanction.sanction_info

  return (
    <div>
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
                extra_info: initializeExtraInfo(associated_rule)
              }
            })
          }
        />
        <ExtraInfoInput
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
        <Button type='primary' onClick={() => saveSanction()} disabled={buttonIsDisabled}>
          Ça paye !
        </Button>
      </Form>
    </div>
  )
}

export default withConnect<DataProps, OtherProps>(CreateSanctionForm)