// @flow
import React from 'react'
import { mount, type ReactWrapper } from 'enzyme'

import Select from '@Components/common/Select'

const DEFAULT_OPTIONS = [
  {
    value: '1',
    label: 'label 1'
  },
  {
    value: '2',
    label: 'label 2'
  },
  {
    value: '3',
    label: 'label 3'
  }
]

class SingleSelectWrapper extends React.Component<{}, { value: ?Uuid }> {
  constructor (props) {
    super(props)

    this.state = {
      value: undefined
    }
  }

  render () {
    return (
      <Select
        label='Select'
        type='default'
        value={this.state.value}
        onChange={value => this.setState({ value })}
        options={DEFAULT_OPTIONS}
      />
    )
  }
}

const selectValue = (wrapper: ReactWrapper<any>, label: string) => {
  wrapper
    .find('Select')
    .last()
    .simulate('click')

  wrapper
    .find('Select')
    .last()
    .find('li')
    .filterWhere(node => node.text() === label)
    .first()
    .simulate('click')
}

describe('Select', () => {
  it('Selects only one value', () => {
    const wrapper = mount(<SingleSelectWrapper />)

    expect(wrapper.find('.ant-select-selection-selected-value').exists()).toBe(false)

    selectValue(wrapper, 'label 1')

    expect(wrapper.find('.ant-select-selection-selected-value').text()).toBe('label 1')

    selectValue(wrapper, 'label 2')

    expect(wrapper.find('.ant-select-selection-selected-value').text()).toBe('label 2')
  })
})

class MultiSelectWrapper extends React.Component<{}, { value: ?(Uuid[]) }> {
  constructor (props) {
    super(props)

    this.state = {
      value: []
    }
  }

  render () {
    return (
      <Select
        label='Select'
        type='multiple'
        value={this.state.value}
        onChange={value => this.setState({ value })}
        options={DEFAULT_OPTIONS}
      />
    )
  }
}

describe('Multi Select', () => {
  it('Can select more than one value', () => {
    const wrapper = mount(<MultiSelectWrapper />)

    expect(wrapper.find('.ant-select-selection__choice').exists()).toBe(false)

    selectValue(wrapper, 'label 1')

    expect(wrapper.find('.ant-select-selection__choice').text()).toBe('label 1')

    selectValue(wrapper, 'label 2')

    expect(wrapper.find('.ant-select-selection__choice')).toHaveLength(2)
    expect(
      wrapper
        .find('.ant-select-selection__choice')
        .at(0)
        .text()
    ).toBe('label 1')
    expect(
      wrapper
        .find('.ant-select-selection__choice')
        .at(1)
        .text()
    ).toBe('label 2')
  })
})
