import { useContext } from 'react';
import { FilterContext } from '~/context/FilterProvider';

export default function useFilterState() {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error('Context should be use winthin a CountProvider');
  }

  return context;
}
