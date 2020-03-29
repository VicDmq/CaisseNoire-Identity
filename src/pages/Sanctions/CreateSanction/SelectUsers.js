// @flow
import React from 'react';

import FormItem from '@Components/common/FormItem/FormItem';
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
  const label = `Joueur${isMultiple ? '(s)' : ''}`;

  const commonProps: CommonSelectProps = {
    values: {
      type: 'OPTION',
      options: users.map((user) => ({
        value: user.id,
        label: user.firstname + ' ' + user.lastname,
      })),
    },
    placeholder: `Sélectionner l${isMultiple ? 'es' : 'e'} joueur${isMultiple ? '(s)' : ''} à sanctionner`,
    disabled,
  };

  return (
    <FormItem label={label} disabled={disabled} error={!disabled && !(selectedUsers.length > 0)}>
      {isMultiple ? (
        <MultipleSelect value={selectedUsers} onChange={updateSelectedUsers} {...commonProps} />
      ) : (
        <SingleSelect
          value={selectedUsers[0] || undefined}
          onChange={(user) => updateSelectedUsers(user ? [user] : [])}
          {...commonProps}
        />
      )}
    </FormItem>
  );
};

export default SelectUsers;
