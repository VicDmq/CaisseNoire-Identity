// @flow
import React from 'react'
import { Form, Select } from 'antd'

export type OptionProps = {
  value: Uuid,
  label: string
}

type SelectProps = {
  label: string,
  value: ?Uuid,
  onChange: Uuid => void,
  options: OptionProps[],
  required: boolean
}

const CustomSelect = ({ label, value, onChange, options, required }: SelectProps) => {
  const error = required && !value

  return (
    <Form.Item label={label}>
      <Select type='select' value={value} onChange={onChange}>
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
