// @flow
import React from 'react'
import { Form, InputNumber } from 'antd'

type NumericInputProps = {
  label: string,
  value: ?number,
  onChange: number => void,
  min?: number
}

const Select = ({ label, value, onChange, min }: NumericInputProps) => {
  return (
    <Form.Item label={label}>
      <InputNumber min={min} value={value} onChange={onChange} />
    </Form.Item>
  )
}

export default Select
