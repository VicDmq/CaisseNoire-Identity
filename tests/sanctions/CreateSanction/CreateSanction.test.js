// @flow
import React from 'react'
import { cleanup, render, fireEvent, type AllByBoundAttribute } from '@testing-library/react'

import { SanctionForm } from '@Sanctions/CreateSanction/CreateSanction'

import { DEFAULT_TEAM, DEFAULT_USER } from '../../utils/default'

const selectFirstOption = (select: HTMLElement, getAllByRole: AllByBoundAttribute) => {
  fireEvent.click(select)

  const firstOption = getAllByRole('option')[0]

  fireEvent.click(firstOption)
}

describe('SanctionForm', () => {
  afterEach(cleanup)

  it('Disables fields when not admin', () => {
    const { getAllByRole } = render(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin={false} createSanctions={jest.fn()} />
    )

    const fields = getAllByRole((content, element) => element.tagName.toLowerCase() === 'input')

    fields.forEach(field => {
      expect(field).toBeDisabled()
    })
  })

  it('Enables fields when admin', () => {
    const { getAllByRole } = render(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />
    )

    const fields = getAllByRole((content, element) => element.tagName.toLowerCase() === 'input')

    fields.forEach(field => {
      expect(field).toBeEnabled()
    })
  })

  it('Disables save button when fields are empty', () => {
    const { getByRole } = render(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />
    )

    const saveButton = getByRole('button')

    expect(saveButton).toBeDisabled()
  })

  it('Enables save button when fields are filled', () => {
    const { getAllByRole, getByRole } = render(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />
    )

    const saveButton = getByRole('button')

    expect(saveButton).toBeDisabled()

    const [selectUsers, selectRules] = getAllByRole('combobox')

    selectFirstOption(selectUsers, getAllByRole)

    selectFirstOption(selectRules, getAllByRole)

    expect(saveButton).toBeEnabled()
  })

  it('Shows ExtraInfoInput', () => {
    const team = DEFAULT_TEAM

    team.rules[0].kind = {
      type: 'MULTIPLICATION',
      price_to_multiply: 2.0
    }

    const { queryByTestId, getAllByRole, getByTestId } = render(
      <SanctionForm team={team} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />
    )

    expect(queryByTestId('extra-info-input')).not.toBeInTheDocument()

    const [selectUsers, selectRules] = getAllByRole('combobox')

    selectFirstOption(selectUsers, getAllByRole)

    selectFirstOption(selectRules, getAllByRole)

    expect(getByTestId('extra-info-input')).toBeInTheDocument()
  })

  it('Filters out rules with monthly kind', () => {
    const team = DEFAULT_TEAM

    const new_rule: Rule = {
      id: 'rule_id_2',
      name: 'Monthly Rule',
      description: 'This is a description',
      category: 'TRAINING_DAY',
      kind: { type: 'MONTHLY', price: 2 }
    }

    team.rules.push(new_rule)

    const { getAllByRole, getByRole } = render(
      <SanctionForm team={team} users={[DEFAULT_USER]} isAdmin createSanctions={jest.fn()} />
    )

    const selectRules = getAllByRole('combobox')[1]

    expect(selectRules).toBeInTheDocument()

    fireEvent.click(selectRules)

    // Return error if there are more than one option
    const option = getByRole('option')

    expect(option).toHaveTextContent(team.rules[0].name)
  })
})
