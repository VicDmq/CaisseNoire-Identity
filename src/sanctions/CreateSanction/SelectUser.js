// @flow
import React from 'react'

import Select from '@Components/common/Select'

const SelectUser = ({
  users,
  userId,
  updateSelectedUser,
  disabled
}: {
  users: User[],
  userId: ?Uuid,
  updateSelectedUser: (?Uuid) => void,
  disabled: boolean
}) => {
  return (
    <Select
      type='default'
      label='Joueur sanctionné'
      value={userId}
      onChange={id => updateSelectedUser(id)}
      options={users.map(user => ({
        value: user.id,
        label: user.firstname + ' ' + user.lastname
      }))}
      required
      disabled={disabled}
    />
  )
}

export default SelectUser
