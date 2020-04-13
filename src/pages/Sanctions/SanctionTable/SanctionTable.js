// @flow
import React, { useState } from 'react';
import { Table } from 'antd';
import moment, { type Moment } from 'moment';

import { API_DATE_FORMAT } from '@Utils/date';
import { withConnectHOC } from '@HOC';
import MonthPicker from '@Components/MonthPicker';
import columns from './columns';

import STYLES from './sanctionTable.less';

type DataProps = {
  sanctions: Sanction[],
};

type OtherProps = {
  team: Team,
  users: User[],
};

type SanctionTableProps = DataProps & OtherProps;

export const SanctionTable = ({ team, users, sanctions }: SanctionTableProps) => {
  const [month, setMonth] = useState<Moment>(moment());

  const changeMonth = (value: ?Moment) => {
    if (value) {
      setMonth(value);
    }
  };

  const getSanctionsPrice = (userId: Uuid): number => {
    return sanctions
      .filter(
        (sanction) =>
          sanction.user_id === userId && moment(sanction.created_at, API_DATE_FORMAT).isSame(month, 'month'),
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
      <div className={STYLES.monthPickerContainer}>
        <MonthPicker value={month} onChange={changeMonth} showClearIcon={false} />
      </div>
      <Table dataSource={rowsData} columns={columns} pagination={false} className={STYLES.table} />
    </div>
  );
};

export default withConnectHOC<DataProps, OtherProps>(SanctionTable);
