// @flow
import React from 'react'
import { mount } from 'enzyme'

import { SanctionList } from '@Sanctions/SanctionList/SanctionList'

import { DEFAULT_TEAM, DEFAULT_USER, DEFAULT_SANCTION } from '../../utils/default'

describe('SanctionsList', () => {
  it('Displays sanctions list', () => {
    const wrapper = mount(
      <SanctionList
        team={DEFAULT_TEAM}
        users={[DEFAULT_USER]}
        sanctions={[DEFAULT_SANCTION, DEFAULT_SANCTION]}
        isAdmin={false}
        deleteSanction={jest.fn()}
      />
    )

    expect(wrapper.find('SanctionListItem')).toHaveLength(2)
  })

  //   it('Shows modal when deleting sanction', () => {})

  //   it('Shows success message when sanction has been deleted', () => {})

  //   it('Shows error message when deleting sanction has failed', () => {})
})
