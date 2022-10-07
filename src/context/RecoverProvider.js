import { createContext, useReducer } from 'react';

import recoverReducer, { initialState } from '~/reducers/recoverReducer';

export const RecoverContext = createContext();

export default function RecoverProvider({ children }) {
  const [state, dispatch] = useReducer(recoverReducer, initialState);
  return <RecoverContext.Provider value={{ state, dispatch }}>{children}</RecoverContext.Provider>;
}
