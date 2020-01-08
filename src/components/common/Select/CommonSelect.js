// @flow
import React from 'react';
import { Select } from 'antd';

import STYLES from './styles.less';

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
  const optionIsHidden = (option) => {
    if (
      (Array.isArray(props.value) && props.value.includes(option.value)) ||
      (props.value && props.value === option.value)
    ) {
      return true;
    }

    return false;
  };

  const options = props.options.map((option, i) => (
    <Select.Option value={option.value} key={i} hidden={optionIsHidden(option)}>
      {option.label}
    </Select.Option>
  ));

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
      className={STYLES.select}
      dropdownClassName={STYLES.dropdown}
    >
      {options}
    </Select>
  );
}

export default CommonSelect;
