// @flow
import React from 'react';

import type { CommonSelectProps } from '@Components/common/Select/CommonSelect';
import SingleSelect from '@Components/common/Select/SingleSelect';
import MultipleSelect from '@Components/common/Select/MultipleSelect';

const SelectUsers = ({
  users,
  selectedUsers,
  updateSelectedUsers,
  disabled,
  isMultiple,
}: {
  users: User[],
  selectedUsers: Uuid[],
  updateSelectedUsers: (Uuid[]) => void,
  disabled: boolean,
  isMultiple: boolean,
}) => {
  const commonProps: CommonSelectProps = {
    label: `Joueur${isMultiple ? '(s)' : ''} sanctionné${isMultiple ? '(s)' : ''}`,
    options: users.map((user) => ({
      value: user.id,
      label: user.firstname + ' ' + user.lastname,
    })),
    required: true,
    disabled,
  };

  return isMultiple ? (
    <MultipleSelect value={selectedUsers} onChange={updateSelectedUsers} {...commonProps} />
  ) : (
    <SingleSelect
      value={selectedUsers[0] || undefined}
      onChange={(user) => updateSelectedUsers(user ? [user] : [])}
      {...commonProps}
    />
  );
};

export default SelectUsers;
