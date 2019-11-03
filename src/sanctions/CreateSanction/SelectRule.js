// @flow
import React from 'react'

import Select from '@Components/common/Select'
import { RuleCategoryText } from '@Text/rule'

const SelectRule = ({
  rules,
  ruleId,
  updateSelectedRule
}: {
  rules: Rule[],
  ruleId: ?Uuid,
  updateSelectedRule: (?Uuid) => void
}) => {
  return (
    <Select
      label='Sanction à appliquer'
      value={ruleId}
      onChange={id => updateSelectedRule(id)}
      options={rules.map(rule => ({
        value: rule.id,
        label: rule.name + ' (' + RuleCategoryText[rule.category] + ')'
      }))}
      required
    />
  )
}

export default SelectRule
