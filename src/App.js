// @flow
import React from 'react'
import { render } from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Sanctions from './components/sanctions/Sanctions'

import './styles/app.less'

const Routes = () => {
  return (
    <Switch>
      <Route path='/:team_id/sanctions' render={({ match }) => <Sanctions match={match} />} />
    </Switch>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

// $FlowFixMe: getElementById can return null
render(<App />, document.getElementById('app'))
