// test file
import React from 'react'
import { shallow, mount, render } from 'enzyme'

const Foo = () => {
  return <div>Hey</div>
}

const wrapper = shallow(<Foo />)

test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})
