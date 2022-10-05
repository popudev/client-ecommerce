import { loginSuccess } from '~/reducers/actions/authenAction';
import httpRequest from '~/utils/httpRequest';
import { getAccessToken } from '~/utils/localStorage';

import { loading } from '~/components/Loading/core';

export const getInfoUser = async () => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    const res = await httpRequest.get(`/user`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    loading.done();
    return res;
  } catch (err) {
    loading.done().error('Server Error');
  }
};

export const updateInfoUser = async (user, dispatch) => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    const res = await httpRequest.patch(`/user`, user, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(loginSuccess(res));
    return loading.done().success('Updated information');
  } catch (err) {
    return loading.done().error(err.data);
  }
};
