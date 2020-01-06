// @flow
import React from 'react';
import { DatePicker } from 'antd';
import { type Moment } from 'moment';

const { MonthPicker } = DatePicker;

type MonthPickerProps = {
  value?: Moment,
  onChange: (?Moment) => void,
  showClearIcon: ?boolean,
};

const CustomMonthPicker = (props: MonthPickerProps) => {
  return <MonthPicker value={props.value} onChange={props.onChange} allowClear={props.showClearIcon} />;
};

export default CustomMonthPicker;
