// @flow
import React, { useState } from 'react';
import { Table } from 'antd';
import moment, { type Moment } from 'moment';

import withConnect from '@Components/utils/Connect';
import MonthPicker from '@Components/common/MonthPicker/MonthPicker';
import columns from './columns';

import STYLES from './styles.less';

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

  const getSanctionsPrice = (userId: Uuid): number => {
    return sanctions
      .filter(
        (sanction) => sanction.user_id === userId && moment(sanction.created_at, 'YYYY-MM-DD').isSame(month, 'month'),
      )
      .reduce((total, sanction) => total + sanction.price, 0);
  };

  const cotisationPrice = team.rules.reduce(
    (total, rule) => (rule.kind.type === 'MONTHLY' ? total + rule.kind.price : total),
    0,
  );

  const rowsData = users.map((user, i) => {
    const userName = user.nickname || user.firstname + ' ' + user.lastname;
    const sanctionsPrice = getSanctionsPrice(user.id);
    const totalPrice = cotisationPrice + sanctionsPrice;

    return {
      key: i,
      userName,
      cotisationPrice,
      sanctionsPrice,
      totalPrice,
    };
  });

  return (
    <div className={STYLES.container}>
      <div className={STYLES.monthPicker}>
        <MonthPicker value={month} onChange={changeMonth} showClearIcon={false} />
      </div>
      <Table dataSource={rowsData} columns={columns} pagination={false} />
    </div>
  );
};

export default withConnect<DataProps, {}>(SanctionTable);
