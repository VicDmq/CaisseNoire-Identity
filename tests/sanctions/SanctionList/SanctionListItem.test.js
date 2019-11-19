// @flow
import React from 'react'
import { shallow } from 'enzyme'

import { SanctionListItem } from '@Sanctions/SanctionsList/SanctionListItem'
import { DEFAULT_RULE, DEFAULT_USER, DEFAULT_SANCTION } from '../../utils/default'

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
