import { useLocation } from 'react-router-dom';

import { useDidUpdate } from '~/hooks';

import overplay from '../OverPlay/core/overplay';

function ScrollToTop() {
  const pathname = useLocation();
  useDidUpdate(() => {
    // if ([config.routes.home, config.routes.shop, config.routes.cart].includes(pathname)) {
    //   document.documentElement.scrollTop = 0;
    // }

    document.documentElement.scrollTop = 0;
    // overplay.disable();
  }, [pathname]);

  return <></>;
}

export default ScrollToTop;
