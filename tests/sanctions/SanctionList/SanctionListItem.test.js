// @flow
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { SanctionListItem } from '@Pages/Sanctions/SanctionList/SanctionListItem';
import { DEFAULT_RULE, DEFAULT_USER, DEFAULT_SANCTION } from '../../utils/default';

describe('SanctionListItem', () => {
  it('Extends and collapses additionnal description', () => {
    const { queryByTestId, getByTestId } = render(
      <SanctionListItem
        rule={DEFAULT_RULE}
        user={DEFAULT_USER}
        sanction={DEFAULT_SANCTION}
        isAdmin={false}
        showDeleteConfirm={jest.fn()}
      />,
    );

    const expandIcon = getByTestId('expand-icon');

    expect(queryByTestId('extraDescription')).toHaveClass('collapsed');

    fireEvent.click(expandIcon);

    expect(queryByTestId('extraDescription')).toHaveClass('extended');

    fireEvent.click(expandIcon);

    expect(queryByTestId('extraDescription')).toHaveClass('collapsed');
  });

  it('Shows that this rule no longer exists', () => {
    const { getByText } = render(
      <SanctionListItem
        rule={undefined}
        user={DEFAULT_USER}
        sanction={DEFAULT_SANCTION}
        isAdmin={false}
        showDeleteConfirm={jest.fn()}
      />,
    );

    const missingRuleDiv = getByText('Cette règle a été supprimée');

    expect(missingRuleDiv).toHaveClass('missingRule');
  });

  it('Disables button for non administrators', () => {
    const { getByRole } = render(
      <SanctionListItem
        rule={DEFAULT_RULE}
        user={DEFAULT_USER}
        sanction={DEFAULT_SANCTION}
        isAdmin={false}
        showDeleteConfirm={jest.fn()}
      />,
    );

    const disabledButton = getByRole('button');

    expect(disabledButton).toBeDisabled();
  });

  it('Calls showDeleteConfirm', () => {
    const showDeleteConfirm = jest.fn();

    const { getByRole } = render(
      <SanctionListItem
        rule={DEFAULT_RULE}
        user={DEFAULT_USER}
        sanction={DEFAULT_SANCTION}
        isAdmin
        showDeleteConfirm={showDeleteConfirm}
      />,
    );

    const button = getByRole('button');

    fireEvent.click(button);

    expect(showDeleteConfirm).toHaveBeenCalledTimes(1);
    expect(showDeleteConfirm).toHaveBeenCalledWith(DEFAULT_SANCTION.id);
  });
});
