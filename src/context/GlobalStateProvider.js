import { createContext, useReducer, useState } from 'react';
import authenReducer, { initialState } from '~/reducers/authenReducer';

export const GlobalStateContext = createContext();

export default function GlobalStateProvider({ children }) {
  const [globalState, dispatch] = useReducer(authenReducer, initialState);
  const [toastMess, setToastMess] = useState('');

  return (
    <GlobalStateContext.Provider value={{ toastMess, setToastMess, globalState, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
