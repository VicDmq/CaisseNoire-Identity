// @flow
import React from 'react'
import moment, { type Moment } from 'moment'

import DatePicker from '@Components/common/DatePicker/DatePicker'

const DateInput = ({
  date,
  updateDate,
  disabled
}: {
  date: ?Moment,
  updateDate: (?Moment) => void,
  disabled: boolean
}) => {
  const disableDates = (date): boolean => {
    return date.isAfter(moment(), 'day')
  }

  return (
    <DatePicker
      label='Date'
      value={date}
      onChange={updateDate}
      disableDates={disableDates}
      disabled={disabled}
      testId={'date-input'}
    />
  )
}

export default DateInput
