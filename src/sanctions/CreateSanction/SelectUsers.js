// @flow
import React from 'react'

import Select from '@Components/common/Select'

const SelectUser = ({
  users,
  selectedUsers,
  updateSelectedUsers,
  disabled
}: {
  users: User[],
  selectedUsers: Uuid[],
  updateSelectedUsers: (Uuid[]) => void,
  disabled: boolean
}) => {
  return (
    <Select
      multiple
      label='Joueurs sanctionnés'
      value={selectedUsers}
      onChange={users => updateSelectedUsers(users || [])}
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
