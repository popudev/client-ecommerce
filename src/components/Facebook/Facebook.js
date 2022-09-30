import React from 'react';

import useScript from '~/hooks/useScript';

import { loading } from '../Loading/core';

function Facebook(props) {
  const { children, onSuccess = () => {}, onError = () => {} } = props;

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onClick: () => {
          window.FB.login(
            (response) => {
              if (response.authResponse) {
                loading.run();
                window.FB.api('/me?fields=id,name,email,picture', function (userInfo) {
                  const userFb = {
                    facebookId: userInfo.id,
                    fullname: userInfo.name,
                    email: userInfo.email,
                    avatar: userInfo.picture?.data?.url,
                  };

                  onSuccess(userFb, 'facebook');
                });
              } else {
                onError();
              }
            },
            { scope: 'public_profile,email' },
          );
        },
      });
    });
  };

  useScript(
    'facebook-jssdk',
    'https://connect.facebook.net/en_US/sdk.js',
    () => {
      window.fbAsyncInit = () => {
        window.FB.init({
          version: `v3.1`,
          appId: process.env.REACT_APP_FACEBOOK_APP_ID,
          xfbml: true,
          cookie: true,
        });
        window.FB.AppEvents.logPageView();
      };
    },
    (err) => {
      console.log(err);
    },

    [],
  );

  return <>{renderChildren()}</>;
}

export default Facebook;
