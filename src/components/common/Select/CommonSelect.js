// @flow
import React, { type Element, type Node } from 'react';
import { Select } from 'antd';

import STYLES from './styles.less';

export type OptionProps = {
  value: Uuid,
  label: string,
  optionNode?: Node,
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
  const mapValues = (): Element<typeof Option>[] | Element<typeof OptGroup>[] => {
    switch (props.values.type) {
      case 'OPTION':
        return mapOptions(props.values.options);
      case 'GROUP':
        return mapGroups(props.values.groups);
    }

    return ([]: any[]);
  };

  const groupIsHidden = (group: OptGroupProps): boolean => {
    return group.options.every((option) => {
      if (Array.isArray(props.value)) {
        return props.value.includes(option.value);
      } else {
        return option.value === props.value;
      }
    });
  };

  const mapGroups = (groups: OptGroupProps[]): Element<typeof OptGroup>[] => {
    return groups.map((group, i) => (
      //Hidden doesn't work : To fix
      <OptGroup label={group.label} key={i} hidden={groupIsHidden(group)}>
        {mapOptions(group.options)}
      </OptGroup>
    ));
  };

  const optionIsHidden = (option: OptionProps): boolean => {
    if (
      (Array.isArray(props.value) && props.value.includes(option.value)) ||
      (props.value && props.value === option.value)
    ) {
      return true;
    }

    return false;
  };

  const mapOptions = (options: OptionProps[]): Element<typeof Option>[] => {
    return options.map((option) => (
      <Option label={option.label} key={option.value} hidden={optionIsHidden(option)}>
        {option.optionNode || option.label}
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
      optionLabelProp='label'
      optionFilterProp='label'
      className={STYLES.select}
      dropdownClassName={STYLES.dropdown}
    >
      {mapValues()}
    </Select>
  );
}

export default CommonSelect;
