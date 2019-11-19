// @flow
import React from 'react'
import { shallow, mount, type ReactWrapper } from 'enzyme'

import { SanctionForm } from '@Sanctions/CreateSanction/CreateSanction'

import { DEFAULT_TEAM, DEFAULT_USER } from '../../utils/default'

const selectFirstInput = (wrapper: ReactWrapper<any>, selectName: string) => {
  wrapper
    .find(selectName)
    .find('Select')
    .last()
    .simulate('click')

  wrapper
    .find(selectName)
    .find('li')
    .first()
    .simulate('click')
}

describe('SanctionForm', () => {
  it('Disables fields when not admin', () => {
    const wrapper = shallow(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin={false} createSanction={jest.fn()} />
    )

    expect(wrapper.find('SelectUser').prop('disabled')).toBe(true)
    expect(wrapper.find('SelectRule').prop('disabled')).toBe(true)
  })

  it('Enables fields when admin', () => {
    const wrapper = shallow(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanction={jest.fn()} />
    )

    expect(wrapper.find('SelectUser').prop('disabled')).toBe(false)
    expect(wrapper.find('SelectRule').prop('disabled')).toBe(false)
  })

  it('Disables save button when fields are empty', () => {
    const wrapper = shallow(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanction={jest.fn()} />
    )

    expect(wrapper.find('Button').prop('disabled')).toBe(true)
  })

  it('Enables save button when fields are filled', () => {
    const wrapper = mount(
      <SanctionForm team={DEFAULT_TEAM} users={[DEFAULT_USER]} isAdmin createSanction={jest.fn()} />
    )

    selectFirstInput(wrapper, 'SelectUser')

    expect(wrapper.find('Button').prop('disabled')).toBe(true)

    selectFirstInput(wrapper, 'SelectRule')

    expect(wrapper.find('Button').prop('disabled')).toBe(false)
  })

  it('Shows ExtraInfoInput', () => {
    const team = DEFAULT_TEAM

    team.rules[0].kind = {
      type: 'MULTIPLICATION',
      price_to_multiply: 2.0
    }

    const wrapper = mount(<SanctionForm team={team} users={[DEFAULT_USER]} isAdmin createSanction={jest.fn()} />)

    expect(wrapper.find('ExtraInfoInput').isEmptyRender()).toBe(true)

    selectFirstInput(wrapper, 'SelectRule')

    expect(wrapper.find('ExtraInfoInput').isEmptyRender()).toBe(false)
    expect(wrapper.find('ExtraInfoInput').prop('ruleKind')).toBe(team.rules[0].kind)
  })

  it('Filters out rules with monthly kind', () => {
    const team = DEFAULT_TEAM

    team.rules[0].kind = {
      type: 'MONTHLY',
      price: 2.0
    }

    const wrapper = mount(<SanctionForm team={team} users={[DEFAULT_USER]} isAdmin createSanction={jest.fn()} />)

    expect(wrapper.find('SelectRule').prop('rules')).toStrictEqual([])
  })
})
