import { createContext, useReducer } from 'react';

import filterReducer, { initialState } from '~/reducers/filterReducer';

export const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [filterState, filterDispatch] = useReducer(filterReducer, initialState);
  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
}
