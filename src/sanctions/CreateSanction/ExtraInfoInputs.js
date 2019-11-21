// @flow
import React from 'react'

import { Row } from 'antd'

import NumericInput from '@Components/common/NumericInput/NumericInput'
import { TimeUnitText } from '@Text/rule'

const ExtraInfoInput = ({
  user,
  rule,
  extraInfo,
  updateExtraInfo
}: {
  user: User,
  rule: Rule,
  extraInfo: ExtraInfo,
  updateExtraInfo: ExtraInfo => void
}) => {
  if (extraInfo.type === 'MULTIPLICATION') {
    return (
      <NumericInput
        label='Information supplémentaires'
        value={extraInfo.factor}
        onChange={factor =>
          updateExtraInfo({
            type: 'MULTIPLICATION',
            factor
          })
        }
        suffix={rule.kind.type === 'TIME_MULTIPLICATION' ? TimeUnitText[rule.kind.time_unit] : undefined}
        min={1}
        required
      />
    )
  }

  return null
}

const ExtraInfoInputs = ({
  formState,
  updateSanction
}: {
  formState: [User, Rule, CreateSanction][],
  updateSanction: (number, ExtraInfo) => void
}) => {
  return (formState.map(([user, rule, sanction], i) => (
    <ExtraInfoInput
      key={i}
      user={user}
      rule={rule}
      extraInfo={sanction.sanction_info.extra_info}
      updateExtraInfo={extraInfo => updateSanction(i, extraInfo)}
    />
  )): any)
}

export default ExtraInfoInputs
