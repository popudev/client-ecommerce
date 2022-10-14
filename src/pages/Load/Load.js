import { useEffect } from 'react';

import Helmet from '~/components/Helmet';
import { loading } from '~/components/Loading/core';

function Load() {
  useEffect(() => {
    loading.run();

    return () => {
      loading.done();
    };
  });
  return (
    <Helmet title="loading">
      <div className="container"></div>
    </Helmet>
  );
}

export default Load;
