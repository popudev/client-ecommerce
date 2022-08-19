import { createContext, useReducer } from 'react';
import authenReducer, { initialState } from '~/reducer/authenReducer';

export const GlobalStateContext = createContext();

export default function GlobalStateProvider({ children }) {
  const [globalState, dispatch] = useReducer(authenReducer, initialState);
  return <GlobalStateContext.Provider value={{ globalState, dispatch }}>{children}</GlobalStateContext.Provider>;
}
