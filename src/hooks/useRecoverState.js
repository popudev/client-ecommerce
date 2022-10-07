import { useContext } from 'react';

import { RecoverContext } from '~/context/RecoverProvider';

export default function useRecoverState() {
  const context = useContext(RecoverContext);

  if (context === undefined) {
    throw new Error('Context should be use winthin a CountProvider');
  }

  return context;
}
