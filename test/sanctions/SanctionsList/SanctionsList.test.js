// @flow
import React from 'react'
import { shallow, mount, render } from 'enzyme'

import { SanctionListItem } from '@Sanctions/SanctionsList/SanctionListItem'

const DEFAULT_RULE: Rule = {
  id: 'id',
  name: 'Rule',
  description: 'This is a description',
  category: 'TRAINING_DAY',
  kind: {
    type: 'BASIC',
    price: 2.0
  }
}

const DEFAULT_USER: User = {
  id: 'id',
  team_id: 'team_id',
  lastname: 'Snow',
  firstname: 'John',
  nickname: 'King Of the North',
  email: null
}

const DEFAULT_SANCTION: Sanction = {
  id: 'id',
  team_id: 'team_id',
  user_id: 'user_id',
  sanction_info: {
    associated_rule: 'rule_id',
    extra_info: null
  },
  price: 2.0,
  created_at: '2019-10-28'
}

const DEFAULT_LIST_ITEM = (isAdmin: boolean, showDeleteConfirm?: Uuid => void) => {
  return (
    <SanctionListItem
      rule={DEFAULT_RULE}
      user={DEFAULT_USER}
      sanction={DEFAULT_SANCTION}
      isAdmin={isAdmin}
      showDeleteConfirm={showDeleteConfirm || jest.fn()}
    />
  )
}

describe('SanctionListItem', () => {
  it('Extends and collapses additionnal description', () => {
    const wrapper = shallow(
      <SanctionListItem
        rule={DEFAULT_RULE}
        user={DEFAULT_USER}
        sanction={DEFAULT_SANCTION}
        isAdmin={false}
        showDeleteConfirm={jest.fn()}
      />
    )

    expect(wrapper.find('#extraDescription').hasClass('extended')).toBe(false)

    wrapper
      .find('Icon')
      .first()
      .simulate('click')

    expect(wrapper.find('#extraDescription').hasClass('extended')).toBe(true)

    wrapper
      .find('Icon')
      .first()
      .simulate('click')

    expect(wrapper.find('#extraDescription').hasClass('extended')).toBe(false)
  })

  it('Shows that this rule no longer exists', () => {
    const wrapper = shallow(
      <SanctionListItem
        rule={undefined}
        user={DEFAULT_USER}
        sanction={DEFAULT_SANCTION}
        isAdmin={false}
        showDeleteConfirm={jest.fn()}
      />
    )

    expect(wrapper.exists('#definedRule')).toBe(false)
    expect(wrapper.exists('#missingRule')).toBe(true)
  })

  it('Disables button for non administrators', () => {
    const wrapper = shallow(
      <SanctionListItem
        rule={DEFAULT_RULE}
        user={DEFAULT_USER}
        sanction={DEFAULT_SANCTION}
        isAdmin={false}
        showDeleteConfirm={jest.fn()}
      />
    )

    const isDisabled = wrapper.find('Button').prop('disabled')

    expect(isDisabled).toBe(true)
  })

  it('Calls showDeleteConfirm', () => {
    const showDeleteConfirm = jest.fn()

    const wrapper = shallow(
      <SanctionListItem
        rule={DEFAULT_RULE}
        user={DEFAULT_USER}
        sanction={DEFAULT_SANCTION}
        isAdmin
        showDeleteConfirm={showDeleteConfirm}
      />
    )

    wrapper.find('Button').simulate('click')

    expect(showDeleteConfirm).toHaveBeenCalled()
  })
})
