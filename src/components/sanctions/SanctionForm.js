// @flow
import React, { useState } from 'react'
import { Form, Button } from 'reactstrap'

import SelectUser from './SelectUser'
import SelectRule from './SelectRule'
import SanctionDataInput from './SanctionDataInput'

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

export default SanctionForm
