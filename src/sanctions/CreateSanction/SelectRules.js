// @flow
import React from 'react';

import FormItem from '@Components/common/FormItem/FormItem';
import type { CommonSelectProps } from '@Components/common/Select/CommonSelect';
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

  const commonProps: CommonSelectProps = {
    values: {
      type: 'GROUP',
      groups: [
        {
          label: 'Entrainement',
          options: rules
            .filter((rule) => rule.kind.type !== 'MONTHLY' && rule.category === 'TRAINING_DAY')
            .map((rule) => ({
              value: rule.id,
              label: rule.name,
            })),
        },
        {
          label: 'Jour de match',
          options: rules
            .filter((rule) => rule.kind.type !== 'MONTHLY' && rule.category === 'GAME_DAY')
            .map((rule) => ({
              value: rule.id,
              label: rule.name,
            })),
        },
      ],
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
