function toQuery(params, delimiter = '&') {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, '');
}

function toParams(query) {
  const q = query.replace(/^\??\//, '');

  return q.split('&').reduce((values, param) => {
    const [key, value] = param.split('=');

    values[key] = value;

    return values;
  }, {});
}

const usePopupWindow = (id, url, options = { width: 500, height: 500 }) => {
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
            reject('The popup was closed');
            return;
          }

          if (popup.location.href === url || popup.location.pathname === 'blank') {
            return;
          }

          if (!popup.location.search) return;

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
    const y = window.top.outerHeight / 2 + window.top.screenY - options.height / 2;
    const x = window.top.outerWidth / 2 + window.top.screenX - options.width / 2;

    const optionsDefault = {
      ...options,
      location: 'no',
      left: x,
      top: y,
    };

    popup = window.open(url, id, toQuery(optionsDefault, ','));
    poll();

    return promise;
  };

  return { open };
};

export default usePopupWindow;
