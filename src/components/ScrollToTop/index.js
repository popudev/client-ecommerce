import { useLocation } from 'react-router-dom';
import { useDidMountEffect } from '~/hooks';
import overplay from '../OverPlay/core/overplay';

function ScrollToTop() {
  const pathname = useLocation();
  useDidMountEffect(() => {
    document.documentElement.scrollTop = 0;
    overplay.disable();
  }, [pathname]);

  return <></>;
}

export default ScrollToTop;
