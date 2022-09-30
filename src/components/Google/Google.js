import React, { useRef } from 'react';

import useScript from '~/hooks/useScript';

function Google(props) {
  const { children, onSuccess, onError } = props;

  const googleBtn = useRef();

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        ref: googleBtn,
      });
    });
  };

  useScript(
    'google-jssdk',
    'https://apis.google.com/js/api.js',
    () => {
      window.gapi.load('auth2', function () {
        window.auth2 = window.gapi.auth2.init({
          client_id: '314081725484-o673f441ojrgla7jcjdgg9ahe4edq26k.apps.googleusercontent.com',
          plugin_name: 'popushop',
          scope: 'profile',
        });

        window.auth2.attachClickHandler(
          googleBtn.current,
          {},
          function (res) {
            const googleUser = {
              googleId: res.gv.OX,
              fullname: res.gv.zf,
              email: res.gv.Tv,
              avatar: res.gv.gO,
            };
            if (typeof onSuccess === 'function') onSuccess(googleUser, 'google');
          },
          function (error) {
            if (typeof onError === 'function') onError(error);
          },
        );
      });
    },
    (err) => {
      console.log(err);
    },

    [],
  );

  return <>{renderChildren()}</>;
}

export default Google;
