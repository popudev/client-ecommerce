import React from 'react';

import queryString from 'query-string';

import useScript from '~/hooks/useScript';

import { loading } from '../Loading/core';

function Facebook(props) {
  const { children, onSuccess = () => {}, onError = () => {} } = props;

  let isMobile = false;

  try {
    isMobile = !!(
      (window.navigator && window.navigator.standalone) ||
      navigator.userAgent.match('CriOS') ||
      navigator.userAgent.match(/mobile/i)
    );
  } catch (ex) {
    // continue regardless of error
  }

  const login = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          getInfoUser();
        } else {
          onError();
          loading.done();
        }
      },
      { scope: 'public_profile,email' },
    );
  };

  const getInfoUser = () => {
    window.FB.api('/me?fields=id,name,email,picture', (userInfo) => {
      if (!userInfo || userInfo.error) {
        onError();
      } else {
        const userFb = {
          facebookId: userInfo.id,
          fullname: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.picture?.data?.url,
        };

        onSuccess(userFb, 'facebook');
      }
      loading.done();
    });
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onClick: () => {
          if (isMobile) {
            window.location.href = `https://www.facebook.com/dialog/oauth?${queryString.stringify({
              client_id: process.env.REACT_APP_FACEBOOK_APP_ID,
              scope: 'public_profile,email',
              state: 'facebookdirect',
            })}}`;
          }
          window.FB.getLoginStatus((response) => {
            loading.run();
            if (response.status === 'connected') getInfoUser();
            else {
              login();
            }
          });
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
          version: 'v15.0',
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
