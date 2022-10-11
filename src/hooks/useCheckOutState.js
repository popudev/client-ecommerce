import { useContext } from 'react';

import { CheckOutContext } from '~/context/CheckOutProvider';

export default function useCheckOutState() {
  const context = useContext(CheckOutContext);

  if (context === undefined) {
    throw new Error('Context should be use winthin a CountProvider');
  }

  return context;
}
