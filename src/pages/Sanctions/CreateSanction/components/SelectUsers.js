// @flow
import React from 'react';

import FormItem from '@Components/FormItem';
import { SingleSelect, MultipleSelect, type CommonSelectProps } from '@Components/Select';

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
