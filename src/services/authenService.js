import {
  loginFailed,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
  registerFailed,
  registerSuccess,
} from '~/reducers/actions/authenAction';
import httpRequest from '~/utils/httpRequest';

import { loading } from '~/components/Loading/core';

export const registerUser = async (user, dispatch, navigator) => {
  try {
    loading.run();
    const res = await httpRequest.post(`/auth/register`, user);
    dispatch(registerSuccess(res));
    navigator('/login');
    loading.done();
  } catch (err) {
    dispatch(registerFailed(err.data));
    loading.done();
  }
};

export const loginUser = async (user, dispatch, navigator) => {
  try {
    loading.run();
    const res = await httpRequest.post(`/auth/login`, user, { withCredentials: true });
    dispatch(loginSuccess(res));
    navigator(-1);
    loading.done();
  } catch (err) {
    console.log(err);
    dispatch(loginFailed(err.data));
    loading.done();
  }
};

export const logoutUser = async (dispatch, navigator) => {
  try {
    loading.run();
    await httpRequest.get(`/auth/logout`, { withCredentials: true });
    dispatch(logoutSuccess());
    navigator('/login');
    loading.done();
  } catch (err) {
    dispatch(logoutFailed(err.data));
    loading.done().error(err.data);
  }
};

export const loginSuccessThirdParty = async (dispatch, navigator) => {
  try {
    const res = await httpRequest.get(`/auth/login/success`, { withCredentials: true });
    console.log('res: ', res);
    dispatch(loginSuccess(res));
    navigator('/', { replace: true });
    console.log(res);
  } catch (err) {}
};
