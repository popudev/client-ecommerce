import { useEffect } from 'react';

function useScript(id, jsSrc, cb, onError, deps) {
  useEffect(() => {
    const s = 'script';
    const element = document.getElementsByTagName(s)[0];
    const fjs = element;
    let js = element;
    js = document.createElement(s);
    js.id = id;
    js.src = jsSrc;
    if (fjs && fjs.parentNode) {
      fjs.parentNode.insertBefore(js, fjs);
    } else {
      document.head.appendChild(js);
    }
    js.onerror = onError;
    js.onload = cb;

    return () => {
      const element = document.getElementById(id);
      if (element) {
        element.parentNode.removeChild(element);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useScript;
