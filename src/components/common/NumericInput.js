// @flow
import React from 'react'
import { InputNumber } from 'antd'

import FormItem from './FormItem/FormItem'

type NumericInputProps = {
  label: string,
  value: ?number,
  onChange: number => void,
  min?: number,
  required?: boolean
}

const NumericInput = (props: NumericInputProps) => {
  return (
    <FormItem label={props.label} error={props.required && !props.value}>
      <InputNumber min={props.min} value={props.value} onChange={props.onChange} />
    </FormItem>
  )
}

export default NumericInput
