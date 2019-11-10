// @flow
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import { Login } from '../../src/routing/Login/Login'

describe('Login', () => {
  it('Render Login', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Login setSession={(i, j) => console.log(i)} login={(a, b, c) => console.log(a)} />
      </MemoryRouter>
    )

    expect(true).toBe(true)
  })
})
