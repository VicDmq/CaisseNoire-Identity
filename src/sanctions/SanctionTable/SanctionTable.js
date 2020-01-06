// @flow
import React, { useState } from 'react';
import { Table } from 'antd';
import moment, { type Moment } from 'moment';

import withConnect from '@Components/utils/Connect';
import MonthPicker from '@Components/common/MonthPicker/MonthPicker';
import columns from './columns';

type DataProps = {
  team: Team,
  users: User[],
  sanctions: Sanction[],
};

export const SanctionTable = ({ team, users, sanctions }: DataProps) => {
  const [month, setMonth] = useState<Moment>(moment());

  const changeMonth = (value: ?Moment) => {
    if (value) {
      setMonth(value);
    }
  };

  const getPrice = (userId: Uuid): number => {
    return sanctions
      .filter(
        (sanction) => sanction.user_id === userId && moment(sanction.created_at, 'YYYY-MM-DD').isSame(month, 'month'),
      )
      .reduce((total, sanction) => total + sanction.price, 0);
  };

  const cotisations = team.rules.reduce(
    (total, rule) => (rule.kind.type === 'MONTHLY' ? total + rule.kind.price : total),
    0,
  );

  const dataSource = users.map((user, i) => {
    const sanctions = getPrice(user.id);

    return {
      key: i,
      name: user.firstname,
      cotisations,
      sanctions,
      total: cotisations + sanctions,
    };
  });

  return (
    <div>
      <MonthPicker value={month} onChange={changeMonth} showClearIcon={false} />
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default withConnect<DataProps, {}>(SanctionTable);
