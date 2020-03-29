// @flow
import React, { createContext, type Node } from 'react';
import { PromiseState } from 'react-refetch';

type Context = {
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
  const response: Response<{ team: Team, users: User[] }> = PromiseState.all([teamFetch, usersFetch]);

  if (response.pending) return <div>Loading</div>;

  if (response.rejected) return <div>Error</div>;

  if (response.fulfilled) {
    const [team, users] = response.value;
    return <TeamContext.Provider value={{ team, users }}>{children}</TeamContext.Provider>;
  }
};

export default ContextProvider;
