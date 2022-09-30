import React, { useRef } from 'react';

import queryString from 'query-string';

import usePopupWindow from '~/hooks/usePopupWindow';

import { loading } from '../Loading/core';

function Github(props) {
  const { children, onSuccess = () => {}, onError = () => {} } = props;
  const params = {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
  };
  const popup = usePopupWindow('github', 'https://github.com/login/oauth/authorize?' + queryString.stringify(params), {
    width: 600,
    height: 600,
  });

  const handleOnClick = () => {
    loading.run();

    popup
      .open()
      .then((res) => {
        onSuccess(res, 'github');
        loading.done();
      })
      .catch((res) => {
        onError(res, 'github');
        loading.done();
      });
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onClick: handleOnClick,
      });
    });
  };

  return <>{renderChildren()}</>;
}

export default Github;
