// @flow
import React, { type Element } from 'react';
import { Select } from 'antd';

import STYLES from './styles.less';

export type OptionProps = {
  value: Uuid,
  label: string,
};

export type OptGroupProps = {
  label: string,
  options: OptionProps[],
};

export type CommonSelectProps = {|
  values: { type: 'OPTION', options: OptionProps[] } | { type: 'GROUP', groups: OptGroupProps[] },
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

  const mapValues = (): Element<typeof Option>[] | Element<typeof OptGroup>[] => {
    switch (props.values.type) {
      case 'OPTION':
        return mapOptions(props.values.options);
      case 'GROUP':
        return mapGroups(props.values.groups);
    }

    return ([]: any[]);
  };

  const mapGroups = (groups: OptGroupProps[]): Element<typeof OptGroup>[] => {
    return groups.map((group, i) => (
      <OptGroup label={group.label} key={i}>
        {mapOptions(group.options)}
      </OptGroup>
    ));
  };

  const mapOptions = (options: OptionProps[]): Element<typeof Option>[] => {
    return options.map((option, i) => (
      <Option value={option.value} key={i} hidden={optionIsHidden(option)}>
        {option.label}
      </Option>
    ));
  };

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
      {mapValues()}
    </Select>
  );
}

export default CommonSelect;
