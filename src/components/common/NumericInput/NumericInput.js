// @flow
import React from 'react'
import { InputNumber } from 'antd'
import classNames from 'classnames/bind'

import FormItem from '../FormItem/FormItem'

import STYLES from './styles.less'

type NumericInputProps = {
  label: string,
  value: ?number,
  onChange: number => void,
  fullWidth?: boolean,
  suffix?: string,
  min?: number,
  required?: boolean
}

const Suffix = ({ suffix }: { suffix: string }) => {
  return <div className={STYLES.suffix}>{suffix}</div>
}

const NumericInput = (props: NumericInputProps) => {
  const cx = classNames.bind(STYLES)

  return (
    <FormItem label={props.label} error={props.required && !props.value}>
      <div className={cx({ itemWithSuffix: props.suffix, fullWidth: props.fullWidth })}>
        <InputNumber
          min={props.min}
          value={props.value}
          onChange={props.onChange}
          className={cx({ itemWithSuffix: props.suffix, fullWidth: props.fullWidth })}
        />
        {props.suffix && <Suffix suffix={props.suffix} />}
      </div>
    </FormItem>
  )
}

export default NumericInput
