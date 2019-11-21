// @flow
import React from 'react'

import type { CommonSelectProps } from '@Components/common/Select/CommonSelect'
import SingleSelect from '@Components/common/Select/SingleSelect'
import MultipleSelect from '@Components/common/Select/MultipleSelect'

const SelectUsers = ({
  users,
  selectedUsers,
  updateSelectedUsers,
  disabled,
  blockMultiple
}: {
  users: User[],
  selectedUsers: Uuid[],
  updateSelectedUsers: (Uuid[]) => void,
  disabled: boolean,
  blockMultiple: boolean
}) => {
  const commonProps: CommonSelectProps = {
    label: 'Joueurs sanctionnés',
    options: users.map(user => ({
      value: user.id,
      label: user.firstname + ' ' + user.lastname
    })),
    required: true,
    disabled
  }

  return blockMultiple ? (
    <SingleSelect
      value={selectedUsers[0] || undefined}
      onChange={user => updateSelectedUsers(user ? [user] : [])}
      {...commonProps}
    />
  ) : (
    <MultipleSelect value={selectedUsers} onChange={updateSelectedUsers} {...commonProps} />
  )
}

export default SelectUsers
