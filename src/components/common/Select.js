// @flow
import React from 'react'
import { Select } from 'antd'

import FormItem from './FormItem/FormItem'

type OptionProps = {
  value: Uuid,
  label: string
}

type SelectProps = {
  label: string,
  value: ?Uuid,
  onChange: (?Uuid) => void,
  options: OptionProps[],
  required?: boolean
}

const CustomSelect = (props: SelectProps) => {
  const clearSelect = () => {
    props.onChange(undefined)
  }

  return (
    <FormItem label={props.label} error={props.required && !props.value}>
      <Select
        type='select'
        allowClear
        onDeselect={clearSelect}
        value={props.value}
        onChange={props.onChange}
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
