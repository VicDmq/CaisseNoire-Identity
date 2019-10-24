// @flow

import React, { type ChildrenArray, type Element, Children } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

type SelectProps = {
  label: string,
  value: ?string,
  onChange: string => void,
  children: ChildrenArray<Element<'option'>>,
}

const Select = ({ label, value, onChange, children }: SelectProps) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type='select'
        value={value}
        onChange={v => onChange(v.target.value)}
      >
        <option hidden>{React.Children.count(children)}</option>
        {children}
      </Input>
    </FormGroup>
  )
}

export default Select
