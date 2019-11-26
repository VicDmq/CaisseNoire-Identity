// @flow
import React, { useState } from 'react'
import { mount } from 'enzyme'

import NumericInput from '@Components/common/NumericInput/NumericInput'

class Provider extends React.Component<{ min?: number }, { value: ?number }> {
  constructor (props) {
    super(props)

    this.state = {
      value: undefined
    }
  }

  handleChange (value: ?number) {
    if (this.state !== value) {
      this.setState({ value })
    }
  }

  render () {
    const { value } = this.state
    const { min } = this.props

    return (
      <NumericInput
        value={value}
        onChange={value => {
          this.handleChange(value)
        }}
        label=''
        min={min}
      />
    )
  }
}

describe('NumericInput', () => {
  it('Handles bad input correctly when min is given', async done => {
    const min = 1
    const wrapper = mount(<Provider min={min} />)
    wrapper.find('NumericInput').prop('onChange')('aaa')

    await setTimeout(() => {
      expect(wrapper.state('value')).toBe(min)
      done()
    }, 1000)
  })
})
