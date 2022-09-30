import queryString from 'query-string';

function toParams(query) {
  const q = query.replace(/^\??\//, '');

  return q.split('&').reduce((values, param) => {
    const [key, value] = param.split('=');

    values[key] = value;

    return values;
  }, {});
}

const usePopupWindow = (id, url, options) => {
  let promise, iid, popup;

  const cancel = () => {
    if (!iid) return;
    window.clearInterval(iid);
    iid = null;
  };

  const close = () => {
    cancel();
    popup.close();
  };

  const poll = () => {
    promise = new Promise((resolve, reject) => {
      iid = window.setInterval(() => {
        try {
          if (!popup || popup.closed !== false) {
            close();
            reject(new Error('The popup was closed'));
            return;
          }

          if (popup.location.href === url || popup.location.pathname === 'blank') {
            return;
          }

          const params = toParams(popup.location.search.replace(/^\?/, ''));
          resolve(params);
          close();
        } catch (error) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame.
           */
        }
      }, 500);
    });
  };

  const open = () => {
    const optionsDefault = {
      ...options,
      lacation: 'no',
    };

    popup = window.open(url, id, queryString.stringify(optionsDefault, ','));
    poll();

    return promise;
  };

  return { open };
};

export default usePopupWindow;
