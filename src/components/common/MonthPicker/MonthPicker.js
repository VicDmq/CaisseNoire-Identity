// @flow
import React from 'react';
import { DatePicker, Button } from 'antd';
import moment, { type Moment } from 'moment';

const { MonthPicker } = DatePicker;

type MonthPickerProps = {
  value?: Moment,
  onChange: (?Moment) => void,
  showClearIcon: ?boolean,
};

const CustomMonthPicker = (props: MonthPickerProps) => {
  const handleArrowClick = (action: 'DECREMENT' | 'INCREMENT') => {
    if (props.value) {
      const newValue: Moment = moment(props.value);

      switch (action) {
        case 'DECREMENT':
          newValue.subtract(1, 'months');
          break;
        case 'INCREMENT':
          newValue.add(1, 'months');
          break;
      }

      props.onChange(newValue);
    }
  };

  return (
    <div>
      <Button type='primary' shape='circle' icon='left' onClick={() => handleArrowClick('DECREMENT')} />
      <MonthPicker
        value={props.value}
        onChange={props.onChange}
        allowClear={props.showClearIcon}
        format={'MMMM YYYY'}
      />
      <Button type='primary' shape='circle' icon='right' onClick={() => handleArrowClick('INCREMENT')} />
    </div>
  );
};

export default CustomMonthPicker;
