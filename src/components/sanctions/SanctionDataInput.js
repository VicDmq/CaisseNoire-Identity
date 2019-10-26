// @flow
import React from 'react'

import NumericInput from '../common/NumericInput'

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

export default SanctionDataInput
