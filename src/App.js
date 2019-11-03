// @flow
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import Router from './routing/Router'

import './styles/app.less'

const App = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CookiesProvider>
  )
}

// $FlowFixMe: getElementById can return null
render(<App />, document.getElementById('app'))
