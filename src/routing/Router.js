// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Routes from './Routes'
import Login from './Login/Login'

type CookieProps = {
  session: SessionProps
}

export type SessionProps = {
  teamId: Uuid,
  isAdmin: boolean
}

const Router = ({ rootUrl }: { rootUrl: string }) => {
  const [cookies, setCookie, removeCookie] = useCookies<CookieProps, SessionProps>(['session'])

  const setSession = (teamId: Uuid, isAdmin: boolean) => {
    setCookie('session', { teamId, isAdmin }, { path: '/' })
  }

  const deleteSession = () => {
    removeCookie('session', {})
  }

  return (
    <Switch>
      <Route exact path='/' render={() => <Login rootUrl={rootUrl} setSession={setSession} />} />
      <Routes session={cookies.session} rootUrl={rootUrl} deleteSession={deleteSession} />
    </Switch>
  )
}

export default Router
