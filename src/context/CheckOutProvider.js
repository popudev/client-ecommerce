import { createContext, useReducer } from 'react';

import checkOutReducer, { initialState } from '~/reducers/checkOutReducer';

export const CheckOutContext = createContext();

export default function CheckOutProvider({ children }) {
  const [checkOutState, checkOutDispatch] = useReducer(checkOutReducer, initialState);
  return (
    <CheckOutContext.Provider value={{ checkOutState, checkOutDispatch }}>
      {children}
    </CheckOutContext.Provider>
  );
}
