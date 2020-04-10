// @flow
import React from 'react';
import { DatePicker, Button } from 'antd';
import moment, { type Moment } from 'moment';

import STYLES from './monthPicker.less';

const { MonthPicker } = DatePicker;

type MonthPickerProps = {
  value?: Moment,
  onChange: (?Moment) => void,
  format: string,
  showClearIcon: boolean,
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
    <div className={STYLES.customMonthPicker}>
      <Button type='default' icon='left' onClick={() => handleArrowClick('DECREMENT')} className={STYLES.leftButton} />
      <MonthPicker
        value={props.value}
        onChange={props.onChange}
        allowClear={props.showClearIcon}
        format={props.format}
        className={STYLES.monthPicker}
        dropdownClassName={STYLES.dropdownMonthPicker}
      />
      <Button
        type='default'
        icon='right'
        onClick={() => handleArrowClick('INCREMENT')}
        className={STYLES.rightButton}
      />
    </div>
  );
};

CustomMonthPicker.defaultProps = {
  showClearIcon: true,
  format: 'MMMM YYYY',
};

export default CustomMonthPicker;
