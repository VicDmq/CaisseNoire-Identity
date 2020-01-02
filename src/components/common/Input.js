// @flow
import React from "react";
import { Input } from "antd";

import FormItem from "./FormItem/FormItem";

type InputProps = {
  label: string,
  value: string,
  onChange: string => void,
  disabled?: boolean,
  password?: boolean,
  testId?: string
};

const CustomInput = (props: any) => {
  const InputType = props.password ? Input.Password : Input;

  return (
    <FormItem disabled={props.disabled} label={props.label}>
      <InputType
        disabled={props.disabled}
        value={props.value}
        onChange={(e: { target: { value: string } }) =>
          props.onChange(e.target.value)
        }
        test-id={props.testId}
      />
    </FormItem>
  );
};

export default CustomInput;
