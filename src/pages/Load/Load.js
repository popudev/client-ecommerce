import { useEffect } from 'react';

import { loading } from '~/components/Loading/core';

function Load() {
  useEffect(() => {
    loading.run();

    return () => {
      loading.done();
    };
  });
  return <div className="container"></div>;
}

export default Load;
