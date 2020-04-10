// @flow
import React from 'react';
import { Input } from 'antd';

type InputProps = {
  value: ?string,
  onChange: (string) => void,
  disabled: boolean,
  password: boolean,
  testId: string,
};

const CustomInput = (props: InputProps) => {
  const InputType = props.password ? Input.Password : Input;

  return (
    <InputType
      disabled={props.disabled}
      value={props.value}
      onChange={(e: { target: { value: string } }) => props.onChange(e.target.value)}
      test-id={props.testId}
    />
  );
};

CustomInput.defaultProps = {
  disabled: false,
  password: false,
  testId: 'input',
};

export default CustomInput;
