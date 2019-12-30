// @flow
import React from 'react'
import moment from 'moment'

import DatePicker from '@Components/common/DatePicker/DatePicker'

const SelectDate = ({
  date,
  updateDate,
  disabled
}: {
  date: ?string,
  updateDate: (?string) => void,
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
