// @flow
import React, { useState } from 'react';
import { Table, DatePicker } from 'antd';
import moment, { type Moment } from 'moment';

import withConnect from '@Components/utils/Connect';

type DataProps = {
  team: Team,
  users: User[],
  sanctions: Sanction[],
};

const columns = [
  {
    title: 'Nom',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Cotisations',
    dataIndex: 'cotisations',
    key: 'cotisations',
  },
  {
    title: 'Sanctions',
    dataIndex: 'sanctions',
    key: 'sanctions',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
];

// $FlowFixMe
const { MonthPicker } = DatePicker;

export const SanctionTable = ({ team, users, sanctions }: DataProps) => {
  const [month, setMonth] = useState<Moment>(moment());

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
      <MonthPicker value={month} onChange={setMonth} />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default withConnect<DataProps, {}>(SanctionTable);
