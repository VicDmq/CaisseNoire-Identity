// @flow
import React from 'react'

import NumericInput from '../../../components/common/NumericInput'

const label = 'Information supplémentaires'

const ExtraInfoInput = ({
  extraInfo,
  updateExtraInfo
}: {
  extraInfo: ?ExtraInfo,
  updateExtraInfo: ExtraInfo => void
}) => {
  if (extraInfo) {
    switch (extraInfo.type) {
      case 'MULTIPLICATION': {
        return (
          <NumericInput
            label={label}
            value={extraInfo && extraInfo.factor}
            onChange={factor =>
              updateExtraInfo({
                type: 'MULTIPLICATION',
                factor
              })
            }
            min={1}
            required
          />
        )
      }

      default:
        break
    }
  }

  return null
}

export default ExtraInfoInput
