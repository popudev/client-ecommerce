import { useLocation } from 'react-router-dom';
import { useDidMountEffect } from '~/hooks';

function ScrollToTop() {
  const pathname = useLocation();
  useDidMountEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return <></>;
}

export default ScrollToTop;
