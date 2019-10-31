// @flow
import React, { useState } from 'react'
import { render } from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import Sanctions from './sanctions/Sanctions'
import Router from './routing/routes'

import './styles/app.less'

import { Input } from 'antd'

// const Login = ({ match, login, value }: any) => {
//   const [string, setString] = useState('hey')
//   console.log(value)
//   return (
//     <div>
//       <Input
//         value={string}
//         onChange={v => {
//           console.log(v.target)
//           setString(v.target.value)
//         }}
//       />
//       <button onClick={() => login(string)}>Ok</button>
//     </div>
//   )
// }

// const Routes = () => {

//   return (
//     <Switch>
//       <Route
//         exact
//         path='/'
//         render={({ match }) => <Login match={match} value={cookies.authentificated} login={onLogin} />}
//       />
//       <Route path='/:team_id/sanctions' render={({ match }) => <Sanctions match={match} />} />
//     </Switch>
//   )
// }

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
