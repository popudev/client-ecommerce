import { useContext } from 'react';

import { AuthenContext } from '~/context/AuthenProvider';

export default function useAuthenState() {
  const context = useContext(AuthenContext);

  if (context === undefined) {
    throw new Error('Context should be use winthin a CountProvider');
  }

  return context;
}
