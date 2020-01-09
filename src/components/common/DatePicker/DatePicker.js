// @flow
import React from 'react';
import { DatePicker } from 'antd';
import { type Moment } from 'moment';

import STYLES from './styles.less';

type DatePickerProps = {
  value: ?Moment,
  onChange: (?Moment) => void,
  disableDates?: (any) => boolean,
  placeholder?: string,
  disabled: boolean,
  format: string,
  testId: string,
};

const CustomDatePicker = (props: DatePickerProps) => {
  return (
    <div test-id={props.testId}>
      <DatePicker
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

CustomDatePicker.defaultProps = {
  disabled: false,
  format: 'dddd D MMMM',
  testId: 'date-input',
};

export default CustomDatePicker;
