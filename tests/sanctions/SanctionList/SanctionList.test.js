// @flow
import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { SanctionList } from '@Pages/Sanctions/SanctionList/SanctionList';

import { DEFAULT_TEAM, DEFAULT_USER, DEFAULT_SANCTION } from '../../utils/default';

describe('SanctionsList', () => {
  afterEach(cleanup);

  it('Displays sanction list items', () => {
    const { getAllByTestId } = render(
      <SanctionList
        team={DEFAULT_TEAM}
        users={[DEFAULT_USER]}
        sanctions={[DEFAULT_SANCTION, DEFAULT_SANCTION]}
        isAdmin={false}
        deleteSanction={jest.fn()}
      />,
    );

    const listItems = getAllByTestId('sanction-list-item');

    expect(listItems).toHaveLength(2);
  });

  it('Shows success message when sanction has been deleted', async () => {
    const deleteSanction = jest.fn((sanction, successCb) => {
      successCb();
    });

    const { getByRole, getByText, findByText } = render(
      <SanctionList
        team={DEFAULT_TEAM}
        users={[DEFAULT_USER]}
        sanctions={[DEFAULT_SANCTION]}
        isAdmin
        deleteSanction={deleteSanction}
      />,
    );

    const deleteButton = getByRole('button');

    fireEvent.click(deleteButton);

    const confirmButton = getByText('Oui');

    fireEvent.click(confirmButton);

    expect(deleteSanction).toHaveBeenCalled();

    await findByText('Sanction supprimée');
  });

  it('Shows error message when deleting sanction has failed', async () => {
    const deleteSanction = jest.fn((sanction, successCb, errorCb) => {
      errorCb();
    });

    const { getByRole, getByText, findByText } = render(
      <SanctionList
        team={DEFAULT_TEAM}
        users={[DEFAULT_USER]}
        sanctions={[DEFAULT_SANCTION]}
        isAdmin
        deleteSanction={deleteSanction}
      />,
    );

    const deleteButton = getByRole('button');

    fireEvent.click(deleteButton);

    const confirmButton = getByText('Oui');

    fireEvent.click(confirmButton);

    expect(deleteSanction).toHaveBeenCalled();

    await findByText('Impossible de supprimer cette sanction');
  });
});
