// @flow
import React from 'react';
import { DatePicker as DatePickerComponent } from 'antd';
import { type Moment } from 'moment';

import STYLES from './datePicker.less';

type DatePickerProps = {
  value: ?Moment,
  onChange: (?Moment) => void,
  disableDates?: (any) => boolean,
  placeholder?: string,
  disabled: boolean,
  format: string,
  testId: string,
};

const DatePicker = (props: DatePickerProps) => {
  return (
    <div test-id={props.testId}>
      <DatePickerComponent
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        disabledDate={props.disableDates}
        placeholder={props.placeholder}
        className={STYLES.datePicker}
        dropdownClassName={STYLES.dropdownDatePicker}
        format={props.format}
        showToday={false}
      />
    </div>
  );
};

DatePicker.defaultProps = {
  disabled: false,
  format: 'dddd D MMMM',
  testId: 'date-input',
};

export default DatePicker;
