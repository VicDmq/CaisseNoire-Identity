// @flow
import React, { createContext } from 'react';
import { PromiseState } from 'react-refetch';

type ContextProviderProps = {
  teamFetch: Response<Team>,
  usersFetch: Response<User[]>,
  children: any,
};

type Context =
  | {
      team: Team,
      users: User[],
    }
  | typeof undefined;

export const TeamContext = createContext<Context>();

const ContextProvider = ({ children, teamFetch, usersFetch }: ContextProviderProps) => {
  const { pending, fulfilled, value } = PromiseState.all([teamFetch, usersFetch]);

  if (pending) return <div>Loading</div>;
  if (fulfilled) {
    return <TeamContext.Provider value={{ team: value[0], users: value[1] }}>{children}</TeamContext.Provider>;
  }
};

export default ContextProvider;
