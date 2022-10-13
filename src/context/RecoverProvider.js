import { createContext, useReducer } from 'react';

import recoverReducer, { initialState } from '~/reducers/recoverReducer';

export const RecoverContext = createContext();

export default function RecoverProvider({ children }) {
  const [recoverState, recoverDispatch] = useReducer(recoverReducer, initialState);
  return (
    <RecoverContext.Provider value={{ recoverState, recoverDispatch }}>
      {children}
    </RecoverContext.Provider>
  );
}
