// @flow
import React from 'react'
import { render } from '@testing-library/react'
import { mount, type ReactWrapper } from 'enzyme'
import { message } from 'antd'

import { SanctionList } from '@Sanctions/SanctionList/SanctionList'

import { DEFAULT_TEAM, DEFAULT_USER, DEFAULT_SANCTION } from '../../utils/default'

const clickDeleteButton = (wrapper: ReactWrapper<any>) => {
  wrapper
    .find('SanctionListItem')
    .find('Button')
    .simulate('click')
}

const clickConfirmButton = () => {
  const modal = document.querySelector('.ant-modal-body')

  if (modal) {
    const confirmButton = modal.querySelectorAll('.ant-btn')[1]
    if (confirmButton) {
      confirmButton.click()
    }
  }
}

describe('SanctionsList', () => {
  afterEach(() => {
    if (document.body) {
      document.body.innerHTML = ''
    }
  })

  it('Displays sanction list items', () => {
    const { getAllByTestId } = render(
      <SanctionList
        team={DEFAULT_TEAM}
        users={[DEFAULT_USER]}
        sanctions={[DEFAULT_SANCTION, DEFAULT_SANCTION]}
        isAdmin={false}
        deleteSanction={jest.fn()}
      />
    )

    const listItems = getAllByTestId('sanction-list-item')

    expect(listItems).toHaveLength(2)
  })

  it('Shows modal when deleting sanction', () => {
    const wrapper = mount(
      <SanctionList
        team={DEFAULT_TEAM}
        users={[DEFAULT_USER]}
        sanctions={[DEFAULT_SANCTION]}
        isAdmin
        deleteSanction={jest.fn()}
      />
    )

    clickDeleteButton(wrapper)

    expect(document.querySelectorAll('.ant-modal-body')).toHaveLength(1)
  })

  it('Shows success message when sanction has been deleted', async done => {
    const deleteSanction = jest.fn((sanction, successCb, errorCb) => {
      successCb()
    })

    const wrapper = mount(
      <SanctionList
        team={DEFAULT_TEAM}
        users={[DEFAULT_USER]}
        sanctions={[DEFAULT_SANCTION]}
        isAdmin
        deleteSanction={deleteSanction}
      />
    )

    clickDeleteButton(wrapper)

    clickConfirmButton()

    expect(deleteSanction).toHaveBeenCalled()

    const spy = jest.spyOn(message, 'success')

    await setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      done()
    }, 1000)
  })

  it('Shows error message when deleting sanction has failed', async done => {
    const deleteSanction = jest.fn((sanction, successCb, errorCb) => {
      errorCb()
    })

    const wrapper = mount(
      <SanctionList
        team={DEFAULT_TEAM}
        users={[DEFAULT_USER]}
        sanctions={[DEFAULT_SANCTION]}
        isAdmin
        deleteSanction={deleteSanction}
      />
    )

    clickDeleteButton(wrapper)

    clickConfirmButton()

    expect(deleteSanction).toHaveBeenCalled()

    const spy = jest.spyOn(message, 'error')

    await setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      done()
    }, 1000)
  })
})
