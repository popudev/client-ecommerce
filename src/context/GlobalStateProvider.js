import { createContext, useReducer } from 'react';
import authenReducer, { initialState } from '~/reducers/authenReducer';

export const GlobalStateContext = createContext();

export default function GlobalStateProvider({ children }) {
  const [globalState, dispatch] = useReducer(authenReducer, initialState);
  console.log('globalState: ', globalState);
  return <GlobalStateContext.Provider value={{ globalState, dispatch }}>{children}</GlobalStateContext.Provider>;
}
