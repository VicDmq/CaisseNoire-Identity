// @flow
import React from 'react';
import { Tooltip, Icon } from 'antd';

import { RuleCategoryText } from '@Utils/text';
import FormItem from '@Components/common/FormItem/FormItem';
import type { CommonSelectProps, OptGroupProps } from '@Components/common/Select/CommonSelect';
import SingleSelect from '@Components/common/Select/SingleSelect';
import MultipleSelect from '@Components/common/Select/MultipleSelect';

import STYLES from './styles.less';

const OptionNode = ({ rule }: { rule: Rule }) => {
  const handleIconClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={STYLES.optionNode}>
      <span className={STYLES.ruleName}>{rule.name}</span>
      <Tooltip title={rule.description}>
        <span className={STYLES.tooltipIcon} onClick={handleIconClick}>
          <Icon type='question-circle' theme='filled' />
        </span>
      </Tooltip>
    </div>
  );
};

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
    return rules
      .filter((rule) => rule.kind.type !== 'MONTHLY')
      .reduce((acc, rule) => {
        const groupedRules = acc.find((o) => o.category === rule.category);

        if (!groupedRules) {
          acc.push({
            category: rule.category,
            rules: [rule],
          });
        } else {
          groupedRules.rules.push(rule);
        }

        return acc;
      }, [])
      .map(({ category, rules }) => ({
        label: RuleCategoryText[category],
        options: rules.map((rule) => ({
          value: rule.id,
          label: rule.name,
          optionNode: <OptionNode rule={rule} />,
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
