// @flow
import React from 'react'

import type { CommonSelectProps } from '@Components/common/Select/CommonSelect'
import SingleSelect from '@Components/common/Select/SingleSelect'
import MultipleSelect from '@Components/common/Select/MultipleSelect'
import { RuleCategoryText } from '@Text/rule'

const SelectRules = ({
  rules,
  selectedRules,
  updateSelectedRules,
  disabled,
  isMultiple
}: {
  rules: Rule[],
  selectedRules: Uuid[],
  updateSelectedRules: (Uuid[]) => void,
  disabled: boolean,
  isMultiple: boolean
}) => {
  const commonProps: CommonSelectProps = {
    label: 'Sanction à appliquer',
    options: rules
      .filter(rule => rule.kind.type !== 'MONTHLY')
      .map(rule => ({
        value: rule.id,
        label: rule.name + ' (' + RuleCategoryText[rule.category] + ')'
      })),
    required: true,
    disabled
  }

  return isMultiple ? (
    <MultipleSelect value={selectedRules} onChange={updateSelectedRules} {...commonProps} />
  ) : (
    <SingleSelect
      value={selectedRules[0] || undefined}
      onChange={rule => updateSelectedRules(rule ? [rule] : [])}
      {...commonProps}
    />
  )
}

export default SelectRules
