import React, { useRef } from 'react';

import queryString from 'query-string';

import usePopupWindow from '~/hooks/usePopupWindow';
import { loginGithub } from '~/services/authenService';

function Github(props) {
  const { children, onSuccess, onError } = props;
  const params = {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
  };
  const popup = usePopupWindow(
    'github',
    'https://github.com/login/oauth/authorize?' + queryString.stringify(params),
    'popup',
  );

  const handleOnClick = () => {
    popup.open().then((res) => {
      loginGithub(res.code);
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
