import { createContext, useReducer } from 'react';

import checkOutReducer, { initialState } from '~/reducers/checkOutReducer';

export const CheckOutContext = createContext();

export default function CheckOutProvider({ children }) {
  const [state, dispatch] = useReducer(checkOutReducer, initialState);
  return <CheckOutContext.Provider value={{ state, dispatch }}>{children}</CheckOutContext.Provider>;
}
