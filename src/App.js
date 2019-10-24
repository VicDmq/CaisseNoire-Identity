// @flow
import React from 'react'
import { render } from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import SanctionForm from './components/sanctions/Sanctions'

import './app.scss'

const Routes = () => {
  return (
    <Switch>
      <Route
        path='/:team_id/sanctions'
        render={({ match }) => <SanctionForm match={match} />}
      />
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
