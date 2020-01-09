// @flow
import React from 'react';
import { Select } from 'antd';

import STYLES from './styles.less';

export type OptionProps = {
  value: Uuid,
  label: string,
};

export type OptionGroupProps = {
  label: string,
  options: OptionProps[],
};

export type CommonSelectProps = {|
  values: { type: 'OPTION', options: OptionProps[] } | { type: 'GROUP', groups: OptionGroupProps[] },
  placeholder?: string,
  disabled?: boolean,
|};

type SelectProps<T> = {
  value: ?T,
  onChange: (?T) => void,
  multiple: boolean,
  ...CommonSelectProps,
};

const { Option, OptGroup } = Select;

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

  let options = [];

  // props.options.map((option, i) => {
  switch (props.values.type) {
    case 'OPTION':
      options = props.values.options.map((option, i) => (
        <Option value={option.value} key={i} hidden={optionIsHidden(option)}>
          {option.label}
        </Option>
      ));
      break;
    case 'GROUP':
      options = props.values.groups.map((group, i) => (
        <OptGroup label={group.label} key={i}>
          {group.options.map((option, i) => (
            <Option value={option.value} key={i} hidden={optionIsHidden(option)}>
              {option.label}
            </Option>
          ))}
        </OptGroup>
      ));
  }

  return (
    <Select
      mode={props.multiple ? 'multiple' : 'default'}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      placeholder={props.placeholder}
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
