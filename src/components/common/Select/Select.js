// @flow
import React from 'react'
import { Form, Select, type FormItemProps } from 'antd'

import STYLES from './styles.less'

export type OptionProps = {
  value: Uuid,
  label: string
}

type SelectProps = {
  label: string,
  value: ?Uuid,
  onChange: (?Uuid) => void,
  options: OptionProps[],
  required: boolean
}

const CustomSelect = ({ label, value, onChange, options, required }: SelectProps) => {
  const error = required && !value

  const getFormItemProps = (): FormItemProps => {
    const error = required && !value

    return error
      ? {
        validateStatus: 'error',
        help: <div className={STYLES.error}>Ce champs est requis Biatch</div>
      }
      : {}
  }

  const clearSelect = () => {
    onChange(undefined)
  }

  return (
    <Form.Item label={label} {...getFormItemProps()} hasFeedback>
      <Select
        type='select'
        allowClear
        onDeselect={clearSelect}
        value={value}
        onChange={onChange}
        showSearch
        filterOption
        optionFilterProp='children'
      >
        {options.map((option, i) => (
          <Select.Option value={option.value} key={i}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}

CustomSelect.defaultProps = { required: false }

export default CustomSelect
