// @flow
import React from 'react'

import { Row } from 'antd'

import NumericInput from '@Components/common/NumericInput/NumericInput'
import { TimeUnitText } from '@Text/rule'

const ExtraInfoInput = ({
  ruleKind,
  extraInfo,
  updateExtraInfo
}: {
  ruleKind: ?RuleKind,
  extraInfo: ?ExtraInfo,
  updateExtraInfo: ExtraInfo => void
}) => {
  if (extraInfo) {
    switch (extraInfo.type) {
      case 'MULTIPLICATION': {
        return (
          // <Row type='flex'>
          <NumericInput
            label='Information supplémentaires'
            value={extraInfo && extraInfo.factor}
            onChange={factor =>
              updateExtraInfo({
                type: 'MULTIPLICATION',
                factor
              })
            }
            suffix={ruleKind && ruleKind.type === 'TIME_MULTIPLICATION' ? TimeUnitText[ruleKind.time_unit] : undefined}
            min={1}
            required
          />
          // </Row>
        )
      }

      default:
        break
    }
  }

  return null
}

export default ExtraInfoInput
