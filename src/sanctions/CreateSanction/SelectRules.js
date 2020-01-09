// @flow
import React from 'react';
import _ from 'lodash';

import { RuleCategoryText } from '@Utils/text';
import FormItem from '@Components/common/FormItem/FormItem';
import type { CommonSelectProps, OptGroupProps } from '@Components/common/Select/CommonSelect';
import SingleSelect from '@Components/common/Select/SingleSelect';
import MultipleSelect from '@Components/common/Select/MultipleSelect';

const SelectRules = ({
  rules,
  selectedRules,
  updateSelectedRules,
  disabled,
  isMultiple,
}: {
  rules: Rule[],
  selectedRules: Uuid[],
  updateSelectedRules: (Uuid[]) => void,
  disabled: boolean,
  isMultiple: boolean,
}) => {
  const label = `Sanction${isMultiple ? '(s)' : ''}`;

  const mapGroups = (): OptGroupProps[] => {
    const rulesFiltered: Rule[] = rules.filter((rule) => rule.kind.type !== 'MONTHLY');

    const rulesGroupedByCategory: { [key: RuleCategory]: Rule[] } = _.groupBy(rulesFiltered, 'category');

    //$FlowIssue: entries(object: any): Array<[string, mixed]>
    const entries: [RuleCategory, Rule[]][] = Object.entries(rulesGroupedByCategory);

    return entries.map(([category, rules]) => ({
      label: RuleCategoryText[category],
      options: rules.map((rule) => ({
        value: rule.id,
        label: rule.name,
      })),
    }));
  };

  const commonProps: CommonSelectProps = {
    values: {
      type: 'GROUP',
      groups: mapGroups(),
    },
    placeholder: `Sélectionner l${isMultiple ? 'es' : 'a'} sanction${isMultiple ? '(s)' : ''} à appliquer`,
    disabled,
  };

  return (
    <FormItem label={label} disabled={disabled} error={!disabled && !(selectedRules.length > 0)}>
      {isMultiple ? (
        <MultipleSelect value={selectedRules} onChange={updateSelectedRules} {...commonProps} />
      ) : (
        <SingleSelect
          value={selectedRules[0] || undefined}
          onChange={(rule) => updateSelectedRules(rule ? [rule] : [])}
          {...commonProps}
        />
      )}
    </FormItem>
  );
};

export default SelectRules;
