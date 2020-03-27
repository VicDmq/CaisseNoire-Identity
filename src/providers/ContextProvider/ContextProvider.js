// @flow
import React, { createContext, useContext } from 'react';

type ContextProviderProps = {
  teamFetch: Response<Team>,
  usersFetch: Response<User[]>,
  children: any,
};

const env: EnvContext = {
  rootUrl: process.env.REACT_APP_API_URL || '',
};

const AppContext = createContext();

const ContextProvider = ({ children, teamFetch, usersFetch }: ContextProviderProps) => {
  console.log(usersFetch);
  return (
    <AppContext.Provider value={{ teamFetch, usersFetch }}>
      <Test>{children}</Test>
    </AppContext.Provider>
  );
};

const Test = ({ children }) => {
  const context = useContext(AppContext);
  console.log(context);
  return (
    <div>
      {context.teamFetch && context.teamFetch.refreshing && <div>Je rafraichis</div>}
      {children}
    </div>
  );
};

export default ContextProvider;
