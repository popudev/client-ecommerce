import { useContext } from 'react';
import { GlobalStateContext } from '~/context/GlobalStateProvider';

export default function useGlobalState() {
  const context = useContext(GlobalStateContext);

  if (context === undefined) {
    throw new Error('Context should be use winthin a CountProvider');
  }

  return context;
}
