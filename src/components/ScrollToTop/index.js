import { useLocation } from 'react-router-dom';
import { useDidUpdate } from '~/hooks';
import overplay from '../OverPlay/core/overplay';

function ScrollToTop() {
  const pathname = useLocation();
  useDidUpdate(() => {
    document.documentElement.scrollTop = 0;
    overplay.disable();
  }, [pathname]);

  return <></>;
}

export default ScrollToTop;
