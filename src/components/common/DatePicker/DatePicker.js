// @flow
import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

import FormItem from '../FormItem/FormItem'

import STYLES from './styles.less'

type DatePickerProps = {
  label: string,
  value: ?string,
  onChange: (?string) => void,
  disableDates?: any => boolean,
  disabled?: boolean
}

const CustomDatePicker = (props: DatePickerProps) => {
  const value = props.value ? moment(props.value, 'YYYY-MM-DD') : props.value

  const onChange = (date, dateString) => {
    props.onChange(dateString !== '' ? dateString : undefined)
  }

  return (
    <FormItem disabled={props.disabled} label={props.label}>
      <DatePicker
        value={value}
        onChange={onChange}
        disabledDate={props.disableDates}
        className={STYLES.datePicker}
        showToday={false}
        format={'dddd D MMMM'}
      />
    </FormItem>
  )
}

export default CustomDatePicker
