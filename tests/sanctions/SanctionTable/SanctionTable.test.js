// @flow
import React from 'react';
import { render, within } from '@testing-library/react';
import moment from 'moment';

import { SanctionTable } from '@Sanctions/SanctionTable/SanctionTable';
import { DEFAULT_TEAM, DEFAULT_USER, DEFAULT_RULE, DEFAULT_SANCTION } from '../../utils/default';

describe('SanctionTable', () => {
  it('Shows one row for each users', () => {
    const { getByRole } = render(
      <SanctionTable team={DEFAULT_TEAM} users={[DEFAULT_USER, DEFAULT_USER]} sanctions={[]}></SanctionTable>,
    );

    const tableBody = getByRole((content, element) => element.tagName.toLowerCase() === 'tbody');

    const rows = within(tableBody).getAllByRole((content, element) => element.tagName.toLowerCase() === 'tr');

    expect(rows).toHaveLength(2);
  });

  it('Shows cotisations, sanctions and total price', () => {
    const monthlyRule = { ...DEFAULT_RULE };

    const monthlyRuleKind = {
      type: 'MONTHLY',
      price: 3.0,
    };

    monthlyRule.kind = monthlyRuleKind;

    const team = { ...DEFAULT_TEAM };

    team.rules = [monthlyRule];

    const sanctions = [{ ...DEFAULT_SANCTION, created_at: moment().format('YYYY-MM-DD') }];

    const { queryByTestId } = render(<SanctionTable team={team} users={[DEFAULT_USER]} sanctions={sanctions} />);

    const cotisationPrice = monthlyRuleKind.price;
    const sanctionPrice = sanctions[0].price;
    const totalPrice = cotisationPrice + sanctionPrice;

    expect(queryByTestId('cotisation')).toHaveTextContent(cotisationPrice.toString());
    expect(queryByTestId('sanction')).toHaveTextContent(sanctionPrice.toString());
    expect(queryByTestId('total')).toHaveTextContent(totalPrice.toString());
  });

  it('Filters according to the month selected', () => {
    const sanctions = [
      DEFAULT_SANCTION,
      { ...DEFAULT_SANCTION, price: 5.0, created_at: moment().format('YYYY-MM-DD') },
    ];

    const { queryByTestId } = render(
      <SanctionTable team={DEFAULT_TEAM} users={[DEFAULT_USER]} sanctions={sanctions} />,
    );

    expect(queryByTestId('sanction')).toHaveTextContent(sanctions[1].price.toString());
  });
});
