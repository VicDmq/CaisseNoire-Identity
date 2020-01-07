// @flow
import React from 'react';
import { Select } from 'antd';

export type OptionProps = {
  value: Uuid,
  label: string,
};

export type CommonSelectProps = {|
  options: OptionProps[],
  disabled?: boolean,
|};

type SelectProps<T> = {
  value: ?T,
  onChange: (?T) => void,
  multiple: boolean,
  ...CommonSelectProps,
};

function CommonSelect<T>(props: SelectProps<T>) {
  const shouldBeHidden = (option) => {
    if (
      (Array.isArray(props.value) && props.value.includes(option.value)) ||
      (props.value && props.value === option.value)
    ) {
      return true;
    }

    return false;
  };

  const mapOptions = () => {
    return props.options.map((option, i) => (
      <Select.Option value={option.value} key={i} hidden={shouldBeHidden(option)}>
        {option.label}
      </Select.Option>
    ));
  };

  return (
    <Select
      mode={props.multiple ? 'multiple' : 'default'}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      allowClear
      showSearch
      filterOption
      optionFilterProp='children'
    >
      {mapOptions()}
    </Select>
  );
}

export default CommonSelect;
