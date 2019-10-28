// @flow
import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

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

const Select = ({ label, value, onChange, options, required }: SelectProps) => {
  const error = required && !value

  return (
    <FormGroup>
      <Label>
        {label} {required ? '*' : ''}
      </Label>
      <Input type='select' value={value} onChange={e => onChange(e.target.value)} invalid={error}>
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

Select.defaultProps = { required: false }

export default Select
