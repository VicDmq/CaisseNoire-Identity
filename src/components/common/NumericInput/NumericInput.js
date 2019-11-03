// @flow
import React from 'react'
import { InputNumber } from 'antd'

import FormItem from '../FormItem/FormItem'

import STYLES from './styles.less'

type NumericInputProps = {
  label: string,
  value: ?number,
  onChange: number => void,
  suffix?: string,
  min?: number,
  required?: boolean
}

const Suffix = ({ suffix }: { suffix: string }) => {
  return <div className={STYLES.suffix}>{suffix}</div>
}

const NumericInput = (props: NumericInputProps) => {
  return (
    <FormItem label={props.label} error={props.required && !props.value}>
      <div className={props.suffix ? STYLES.itemWithSuffix : ''}>
        <InputNumber
          min={props.min}
          value={props.value}
          onChange={props.onChange}
          className={props.suffix ? STYLES.inputWithSuffix : ''}
        />
        {props.suffix && <Suffix suffix={props.suffix} />}
      </div>
    </FormItem>
  )
}

export default NumericInput
