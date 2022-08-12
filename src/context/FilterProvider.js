import { createContext, useReducer } from 'react';
import filterReducer, { initialState } from '~/reducer/filterReducer';

export const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  return <FilterContext.Provider value={[state, dispatch]}>{children}</FilterContext.Provider>;
}
