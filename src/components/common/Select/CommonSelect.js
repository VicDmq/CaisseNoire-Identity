// @flow
import React from 'react'
import { Select } from 'antd'

import FormItem from '../FormItem/FormItem'

type OptionProps = {
  value: Uuid,
  label: string
}

export type CommonSelectProps = {|
  label: string,
  options: OptionProps[],
  required?: boolean,
  disabled?: boolean
|}

type SelectProps<T> = {
  value: ?T,
  onChange: (?T) => void,
  multiple: boolean,
  ...CommonSelectProps
}

function CommonSelect<T> (props: SelectProps<T>) {
  const showError = () => {
    if (!props.disabled && props.required) {
      if (props.multiple) {
        return !props.value || (Array.isArray(props.value) && props.value.length) === 0
      } else {
        return !props.value
      }
    }

    return false
  }

  const shouldBeHidden = option => {
    if (
      (Array.isArray(props.value) && props.value.includes(option.value)) ||
      (props.value && props.value === option.value)
    ) {
      return true
    }

    return false
  }

  const mapOptions = () => {
    return props.options.map((option, i) => (
      <Select.Option value={option.value} key={i} hidden={shouldBeHidden(option)}>
        {option.label}
      </Select.Option>
    ))
  }

  return (
    <FormItem label={props.label} error={showError()} disabled={props.disabled}>
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
    </FormItem>
  )
}

export default CommonSelect
