// @flow
import React from 'react'

import Select from '../../../components/common/Select'

const SelectUser = ({
  users,
  userId,
  updateSelectedUser
}: {
  users: User[],
  userId: ?Uuid,
  updateSelectedUser: (?Uuid) => void
}) => {
  return (
    <Select
      label='Joueur sanctionné'
      value={userId}
      onChange={id => updateSelectedUser(id)}
      options={users.map(user => ({
        value: user.id,
        label: user.firstname + ' ' + user.lastname
      }))}
      required
    />
  )
}

export default SelectUser
