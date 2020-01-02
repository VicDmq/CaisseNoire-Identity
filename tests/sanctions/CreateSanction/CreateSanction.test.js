// @flow
import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  type AllByBoundAttribute,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import moment from 'moment';

import { SanctionForm } from '@Sanctions/CreateSanction/CreateSanction';

import { DEFAULT_TEAM, DEFAULT_USER } from '../../utils/default';

const selectFirstOption = (select: HTMLElement, getAllByRole: AllByBoundAttribute) => {
  fireEvent.click(select);

  const firstOption = getAllByRole('option')[0];

  fireEvent.click(firstOption);
};

describe('SanctionForm', () => {
  afterEach(cleanup);

  it('Disables fields when not admin', () => {
    const { getAllByRole } = render(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin={false} createSanctions={jest.fn()} />,
    );

    const fields = getAllByRole((content, element) => element.tagName.toLowerCase() === 'input');

    fields.forEach((field) => {
      expect(field).toBeDisabled();
    });
  });

  it('Enables fields when admin', () => {
    const { getAllByRole } = render(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />,
    );

    const fields = getAllByRole((content, element) => element.tagName.toLowerCase() === 'input');

    fields.forEach((field) => {
      expect(field).toBeEnabled();
    });
  });

  it('Disables save button when required fields are empty', () => {
    const { getByRole } = render(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />,
    );

    const saveButton = getByRole('button');

    expect(saveButton).toBeDisabled();
  });

  it('Enables save button when required fields are filled', () => {
    const { getAllByRole, getByRole } = render(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />,
    );

    const saveButton = getByRole('button');

    expect(saveButton).toBeDisabled();

    const [selectUsers, selectRules] = getAllByRole('combobox');

    selectFirstOption(selectUsers, getAllByRole);

    selectFirstOption(selectRules, getAllByRole);

    expect(saveButton).toBeEnabled();
  });

  it('Disables multiple rules select when more than one user is selected', async () => {
    const users = [DEFAULT_USER];
    const new_user: User = {
      ...DEFAULT_USER,
      id: 'user_id_2',
    };
    users.push(new_user);

    const { getAllByRole, getByText } = render(
      <SanctionForm team={DEFAULT_TEAM} users={users} isAdmin createSanctions={jest.fn()} />,
    );

    const [selectUsers, multipleSelect] = getAllByRole('combobox');

    expect(multipleSelect).toHaveClass('ant-select-selection--multiple');
    getByText('Sanction(s) à appliquer');

    selectFirstOption(selectUsers, getAllByRole);
    selectFirstOption(selectUsers, getAllByRole);

    const singleSelect = getAllByRole('combobox')[1];
    getByText('Sanction à appliquer');
    expect(singleSelect).toHaveClass('ant-select-selection--single');
  });

  it('Disables multiple users select when more than one rule is selected', async () => {
    const new_rule: Rule = {
      ...DEFAULT_TEAM.rules[0],
      id: 'rule_id_2',
    };
    const team: Team = {
      ...DEFAULT_TEAM,
      rules: [...DEFAULT_TEAM.rules, new_rule],
    };

    const { getAllByRole, getByText } = render(
      <SanctionForm team={team} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />,
    );

    const [multipleSelect, selectRules] = getAllByRole('combobox');

    expect(multipleSelect).toHaveClass('ant-select-selection--multiple');
    getByText('Joueur(s) sanctionné(s)');

    selectFirstOption(selectRules, getAllByRole);
    selectFirstOption(selectRules, getAllByRole);

    const singleSelect = getAllByRole('combobox')[0];
    getByText('Joueur sanctionné');
    expect(singleSelect).toHaveClass('ant-select-selection--single');
  });

  it('Shows ExtraInfoInput', () => {
    const team: Team = {
      ...DEFAULT_TEAM,
      rules: [
        {
          ...DEFAULT_TEAM.rules[0],
          kind: {
            type: 'MULTIPLICATION',
            price_to_multiply: 2.0,
          },
        },
      ],
    };

    const { queryByTestId, getAllByRole } = render(
      <SanctionForm team={team} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />,
    );

    expect(queryByTestId('extra-info-input')).not.toBeInTheDocument();

    const [selectUsers, selectRules] = getAllByRole('combobox');

    selectFirstOption(selectUsers, getAllByRole);

    selectFirstOption(selectRules, getAllByRole);

    expect(queryByTestId('extra-info-input')).toBeInTheDocument();
  });

  it('Removes associated ExtraInfoInput when multiple rules are selected', async () => {
    const new_rule_1: Rule = {
      ...DEFAULT_TEAM.rules[0],
      id: 'rule_id_2',
      name: 'Rule 2',
      kind: {
        type: 'MULTIPLICATION',
        price_to_multiply: 2.0,
      },
    };

    const new_rule_2: Rule = {
      ...DEFAULT_TEAM.rules[0],
      id: 'rule_id_3',
      name: 'Rule 3',
      kind: {
        type: 'TIME_MULTIPLICATION',
        price_per_time_unit: 2.0,
        time_unit: 'MINUTE',
      },
    };

    const team: Team = {
      ...DEFAULT_TEAM,
      rules: [...DEFAULT_TEAM.rules, new_rule_1, new_rule_2],
    };

    const { getAllByRole, queryAllByTestId, getByText } = render(
      <SanctionForm team={team} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />,
    );

    const [selectUsers, selectRules] = getAllByRole('combobox');
    selectFirstOption(selectUsers, getAllByRole);
    selectFirstOption(selectRules, getAllByRole);
    selectFirstOption(selectRules, getAllByRole);
    selectFirstOption(selectRules, getAllByRole);

    const deleteIcons = getAllByRole('presentation').map((rulePresentation) =>
      within(rulePresentation).getByLabelText('icon: close'),
    );

    fireEvent.click(deleteIcons[0]);
    expect(queryAllByTestId('extra-info-input')).toHaveLength(2);
    getByText(`Détails (${team.rules[1].name})`);
    getByText(`Détails (${team.rules[2].name})`);

    fireEvent.click(deleteIcons[1]);
    expect(queryAllByTestId('extra-info-input')).toHaveLength(1);
    getByText('Détails supplémentaires');

    fireEvent.click(deleteIcons[2]);
    expect(queryAllByTestId('extra-info-input')).toHaveLength(0);
  });

  it('Removes associated ExtraInfoInput when multiple users are selected', async () => {
    const users = [DEFAULT_USER];

    const new_user_1: User = {
      ...DEFAULT_USER,
      id: 'user_id_2',
      nickname: 'User 2',
    };

    users.push(new_user_1);

    const new_user_2: User = {
      ...DEFAULT_USER,
      id: 'user_id_3',
      nickname: undefined,
    };

    users.push(new_user_2);

    const team: Team = {
      ...DEFAULT_TEAM,
      rules: [
        {
          ...DEFAULT_TEAM.rules[0],
          kind: {
            type: 'MULTIPLICATION',
            price_to_multiply: 2.0,
          },
        },
      ],
    };

    const { getAllByRole, queryAllByTestId, getByText } = render(
      <SanctionForm team={team} users={users} isAdmin createSanctions={jest.fn()} />,
    );

    const [selectUsers, selectRules] = getAllByRole('combobox');
    selectFirstOption(selectRules, getAllByRole);
    selectFirstOption(selectUsers, getAllByRole);
    selectFirstOption(selectUsers, getAllByRole);
    selectFirstOption(selectUsers, getAllByRole);

    const deleteIcons = getAllByRole('presentation').map((userPresentation) =>
      within(userPresentation).getByLabelText('icon: close'),
    );

    expect(queryAllByTestId('extra-info-input')).toHaveLength(3);
    getByText(`Détails (${users[0].nickname})`);
    getByText(`Détails (${users[1].nickname})`);
    getByText(`Détails (${users[2].firstname + ' ' + users[2].lastname[0]})`);

    fireEvent.click(deleteIcons[0]);
    expect(queryAllByTestId('extra-info-input')).toHaveLength(2);
    getByText(`Détails (${users[1].nickname})`);
    getByText(`Détails (${users[2].firstname + ' ' + users[2].lastname[0]})`);

    fireEvent.click(deleteIcons[1]);
    expect(queryAllByTestId('extra-info-input')).toHaveLength(1);
    getByText(`Détails supplémentaires`);

    fireEvent.click(deleteIcons[2]);
    expect(queryAllByTestId('extra-info-input')).toHaveLength(0);
  });

  it('Filters out rules with monthly kind', () => {
    const new_rule: Rule = {
      id: 'rule_id_2',
      name: 'Monthly Rule',
      description: 'This is a description',
      category: 'TRAINING_DAY',
      kind: { type: 'MONTHLY', price: 2 },
    };

    const team: Team = {
      ...DEFAULT_TEAM,
      rules: [...DEFAULT_TEAM.rules, new_rule],
    };

    const { getAllByRole } = render(
      <SanctionForm team={team} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />,
    );

    const selectRules = getAllByRole('combobox')[1];

    fireEvent.click(selectRules);

    const options = getAllByRole('option');

    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent(team.rules[0].name);
  });

  it('Sends sanctions without date if none has been selected', () => {
    const createSanctionsMock = jest.fn();

    const { getAllByRole, getByRole } = render(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanctions={createSanctionsMock} />,
    );

    const [selectUsers, selectRules] = getAllByRole('combobox');

    selectFirstOption(selectUsers, getAllByRole);

    selectFirstOption(selectRules, getAllByRole);

    const saveButton = getByRole('button');

    fireEvent.click(saveButton);

    expect(createSanctionsMock).toHaveBeenCalled();
    expect(createSanctionsMock.mock.calls[0][0][0]['created_at']).toBe(undefined);
  });

  it('Sends sanctions without date if none has been selected', async () => {
    const createSanctionsMock = jest.fn();

    const { getAllByRole, getByRole, getByTestId } = render(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanctions={createSanctionsMock} />,
    );

    const [selectUsers, selectRules] = getAllByRole('combobox');

    selectFirstOption(selectUsers, getAllByRole);

    selectFirstOption(selectRules, getAllByRole);

    const dateInput = within(getByTestId('date-input')).getByRole(
      (content, element) => element.tagName.toLowerCase() === 'input',
    );

    fireEvent.click(dateInput);

    const dateCell = getAllByRole('gridcell')[0];

    fireEvent.click(dateCell);

    const date = moment(dateInput.value, 'dddd D MMMM');

    await waitForElementToBeRemoved(() => getAllByRole('gridcell'));

    const saveButton = getByRole('button');

    fireEvent.click(saveButton);

    expect(createSanctionsMock).toHaveBeenCalled();
    expect(createSanctionsMock.mock.calls[0][0][0]['created_at']).toBe(date.format('YYYY-MM-DD'));
  });
});
