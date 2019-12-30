// @flow
import React from 'react'
import moment, { type Moment } from 'moment'

import DatePicker from '@Components/common/DatePicker/DatePicker'

const SelectDate = ({
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
    />
  )
}

export default SelectDate
