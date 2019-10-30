// @flow
import React, { useState } from 'react'
import { Row, Form, message, Button } from 'antd'

import withConnect from '../../components/utils/Connect'

import SelectUser from './inputs/SelectUser'
import SelectRule from './inputs/SelectRule'
import ExtraInfoInput from './inputs/ExtraInfoInput'

import STYLES from '../styles.less'

type DataProps = {
  team: Team,
  users: User[]
}

type OtherProps = {
  createSanction: (CreateSanction, (Sanction) => void, (Reason) => void) => void
}

type CreateSanctionProps = DataProps & OtherProps

const SanctionForm = ({ team, users, createSanction }: CreateSanctionProps) => {
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

  const buttonIsDisabled: boolean = !sanction.user_id || !sanction.sanction_info

  return (
    <Row type='flex' justify='center'>
      <Form hideRequiredMark colon={false} className={STYLES.form}>
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
                extra_info: associated_rule ? initializeExtraInfo(associated_rule) : undefined
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
        <Button type='primary' onClick={saveSanction} disabled={buttonIsDisabled} loading={creatingSanction}>
          {creatingSanction ? '' : 'Ça paye !'}
        </Button>
      </Form>
    </Row>
  )
}

export default withConnect<DataProps, OtherProps>(SanctionForm)
