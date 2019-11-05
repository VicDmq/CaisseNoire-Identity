// @flow
import React from 'react'
import { Input } from 'antd'

import FormItem from './FormItem/FormItem'

type InputProps = {
  label: string,
  value: string,
  onChange: string => void,
  disabled?: boolean,
  password?: boolean
}

const CustomInput = (props: any) => {
  const Component = props.password ? Input.Password : Input

  return (
    <FormItem disabled={props.disabled} label={props.label}>
      <Component
        disabled={props.disabled}
        value={props.value}
        onChange={(e: { target: { value: string } }) => props.onChange(e.target.value)}
      />
    </FormItem>
  )
}

export default CustomInput
