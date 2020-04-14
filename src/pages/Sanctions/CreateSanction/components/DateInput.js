// @flow
import React from 'react';
import moment, { type Moment } from 'moment';

import DatePicker from '@Components/DatePicker';
import FormItem from '@Components/FormItem';

const DateInput = ({ date, updateDate }: { date: ?Moment, updateDate: (?Moment) => void }) => {
  const disableDates = (date): boolean => {
    return date.isAfter(moment(), 'day');
  };

  return (
    <FormItem label='Date'>
      <DatePicker
        value={date}
        onChange={updateDate}
        disableDates={disableDates}
        placeholder='Sélectionner la date des sanctions'
      />
    </FormItem>
  );
};

export default DateInput;
