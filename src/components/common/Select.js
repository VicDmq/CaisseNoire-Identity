// @flow
import React from 'react'
import { Select } from 'antd'

import FormItem from './FormItem/FormItem'

type OptionProps = {
  value: Uuid,
  label: string
}

type SelectProps<T> = {
  type: 'default' | 'multiple',
  value: ?T,
  onChange: (?T) => void,
  label: string,
  options: OptionProps[],
  required?: boolean,
  disabled?: boolean
}

const CustomSelect = <T>(props: SelectProps<T>) => {
  return (
    <FormItem label={props.label} error={!props.disabled && props.required && !props.value} disabled={props.disabled}>
      <Select
        mode={props.type}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        allowClear
        showSearch
        filterOption
        optionFilterProp='children'
      >
        {props.options.map((option, i) => (
          <Select.Option value={option.value} key={i}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </FormItem>
  )
}

export default CustomSelect
