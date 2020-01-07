// @flow
import React from 'react';
import moment, { type Moment } from 'moment';

import DatePicker from '@Components/common/DatePicker/DatePicker';
import FormItem from '@Components/common/FormItem/FormItem';

const DateInput = ({
  date,
  updateDate,
  disabled,
}: {
  date: ?Moment,
  updateDate: (?Moment) => void,
  disabled: boolean,
}) => {
  const disableDates = (date): boolean => {
    return date.isAfter(moment(), 'day');
  };

  return (
    <FormItem label='Date' disabled={disabled}>
      <DatePicker value={date} onChange={updateDate} disableDates={disableDates} disabled={disabled} />
    </FormItem>
  );
};

export default DateInput;
