// @flow
import React from 'react'

import Select from '../common/Select/Select'

const RuleCategory: { [key: string]: string } = {
  TRAINING_DAY: 'Entrainement',
  GAME_DAY: 'Jour de match'
}

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
    <div>
      <Select
        label='Sanction à appliquer'
        value={ruleId}
        onChange={id => updateSelectedRule(id)}
        options={rules.map(rule => ({
          value: rule.id,
          label: rule.name + ' (' + RuleCategory[rule.category] + ')'
        }))}
        required
      />
    </div>
  )
}

export default SelectRule
