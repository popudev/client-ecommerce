import { createContext, useReducer, useState } from 'react';
import authenReducer, { initialState } from '~/reducers/authenReducer';

export const GlobalStateContext = createContext();

export default function GlobalStateProvider({ children }) {
  const [globalState, dispatch] = useReducer(authenReducer, initialState);

  return <GlobalStateContext.Provider value={{ globalState, dispatch }}>{children}</GlobalStateContext.Provider>;
}
