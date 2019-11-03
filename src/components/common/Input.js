// @flow
import React from 'react'
import { Input } from 'antd'

import FormItem from './FormItem/FormItem'

type InputProps = {
  label: string,
  value: string,
  onChange: string => void,
  disabled?: boolean
}

const CustomInput = (props: any) => {
  return (
    <FormItem disabled={props.disabled} label={props.label}>
      <Input
        disabled={props.disabled}
        value={props.value}
        onChange={(e: { target: { value: string } }) => props.onChange(e.target.value)}
      />
    </FormItem>
  )
}

export default CustomInput
