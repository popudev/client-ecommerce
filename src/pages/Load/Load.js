import { useEffect } from 'react';

import { loading } from '~/components/Loading/core';

function Load() {
  useEffect(() => {
    loading.setImportance(true);
    loading.run();

    return () => {
      loading.setImportance(false);
      loading.done();
    };
  });
  return <div className="container"></div>;
}

export default Load;
