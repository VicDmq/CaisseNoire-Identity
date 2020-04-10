// @flow
import React from 'react';
import { InputNumber } from 'antd';
import classNames from 'classnames/bind';

import STYLES from './numericInput.less';

type NumericInputProps = {
  value: ?number,
  onChange: (number) => void,
  fullWidth: boolean,
  suffix?: string,
  min?: number,
  testId: string,
};

const Suffix = ({ suffix }: { suffix: string }) => {
  return <div className={STYLES.suffix}>{suffix}</div>;
};

const NumericInput = (props: NumericInputProps) => {
  const cx = classNames.bind(STYLES);

  // Ensure bad input is handled correctly
  if (!props.value || typeof props.value !== 'number') {
    props.onChange(props.min || 0);
  }

  return (
    <div
      className={cx({
        itemWithSuffix: props.suffix,
        fullWidth: props.fullWidth,
      })}
      test-id={props.testId}
    >
      <InputNumber
        min={props.min}
        value={props.value}
        onChange={props.onChange}
        className={cx({
          inputWithSuffix: props.suffix,
          fullWidth: props.fullWidth,
        })}
      />
      {props.suffix && <Suffix suffix={props.suffix} />}
    </div>
  );
};

NumericInput.defaultProps = {
  fullWidth: false,
  testId: 'numeric-input',
};

export default NumericInput;
