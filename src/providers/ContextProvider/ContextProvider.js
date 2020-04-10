// @flow
import React, { createContext, type Node } from 'react';
import { PromiseState } from 'react-refetch';
import { useCookies } from 'react-cookie';

import Initialization from './components/Initialization';
import Error from './components/Error';

type Context = {
  isAdmin: boolean,
  team: Team,
  users: User[],
};

// $FlowIgnoreMe: Context is always defined
export let TeamContext = createContext<Context>();

type ContextProviderProps = {
  teamFetch: Response<Team>,
  usersFetch: Response<User[]>,
  children: Node,
};

const ContextProvider = ({ children, teamFetch, usersFetch }: ContextProviderProps) => {
  const [cookies] = useCookies<CookieProps, SessionProps>(['session']);
  const response: Response<{ team: Team, users: User[] }> = PromiseState.all([teamFetch, usersFetch]);

  if (response.pending) return <Initialization />;

  if (response.rejected) return <Error />;

  if (response.fulfilled) {
    const isAdmin = cookies.session.isAdmin;
    const [team, users] = response.value;
    return <TeamContext.Provider value={{ isAdmin, team, users }}>{children}</TeamContext.Provider>;
  }
};

export default ContextProvider;
