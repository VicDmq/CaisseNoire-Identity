// @flow
import React, { type Element } from 'react';

import NumericInput from '@Components/common/NumericInput/NumericInput';
import FormItem from '@Components/common/FormItem/FormItem';
import { TimeUnitText } from '@Utils/text';
import { type ComparisonResult } from './CreateSanction';

const ExtraInfoInput = ({
  user,
  rule,
  extraInfo,
  updateExtraInfo,
  usersComparedToRules,
}: {
  user: User,
  rule: Rule,
  extraInfo: ExtraInfo,
  updateExtraInfo: (ExtraInfo) => void,
  usersComparedToRules: ComparisonResult,
}) => {
  if (extraInfo.type === 'MULTIPLICATION') {
    let label = '';

    switch (usersComparedToRules) {
      case 'MORE':
        label = `Détails (${user.nickname || user.firstname})`;
        break;
      case 'LESS':
        label = `Détails (${rule.name})`;
        break;
      case 'SAME':
        label = 'Détails supplémentaires';
        break;
    }

    return (
      <FormItem label={label}>
        <NumericInput
          value={extraInfo.factor}
          onChange={(factor) =>
            updateExtraInfo({
              type: 'MULTIPLICATION',
              factor,
            })
          }
          suffix={rule.kind.type === 'TIME_MULTIPLICATION' ? TimeUnitText[rule.kind.time_unit] : undefined}
          min={1}
          fullWidth
        />
      </FormItem>
    );
  }

  return null;
};

const ExtraInfoInputs = ({
  formState,
  updateSanction,
  usersComparedToRules,
}: {
  formState: [User, Rule, CreateSanction][],
  updateSanction: (number, ExtraInfo) => void,
  usersComparedToRules: ComparisonResult,
}) => {
  return (formState.map(([user, rule, sanction], i) => (
    <ExtraInfoInput
      key={i}
      user={user}
      rule={rule}
      extraInfo={sanction.sanction_info.extra_info}
      updateExtraInfo={(extraInfo) => updateSanction(i, extraInfo)}
      usersComparedToRules={usersComparedToRules}
    />
  )): Element<typeof ExtraInfoInput>[]);
};

export default ExtraInfoInputs;
