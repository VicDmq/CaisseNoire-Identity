// @flow
import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

type NumericInputProps = {
  label: string,
  value: ?number,
  onChange: number => void,
  min?: number
}

const Select = ({ label, value, onChange, min }: NumericInputProps) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input type='number' min={min} value={value} onChange={e => onChange(e.target.value)} />
    </FormGroup>
  )
}

export default Select
