// @flow
import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

type OptionProps = {
  value: string,
  label: string,
}

type SelectProps = {
  label: string,
  value: ?string,
  onChange: string => void,
  options: OptionProps[],
}

const Select = ({ label, value, onChange, options }: SelectProps) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type='select'
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option hidden />
        {options.map((option, i) => (
          <option value={option.value} key={i}>
            {option.label}
          </option>
        ))}
      </Input>
    </FormGroup>
  )
}

export default Select
