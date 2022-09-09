import httpRequest from '~/utils/httpRequest';
import {
  loginFailed,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
  registerFailed,
  registerSuccess,
} from '~/reducers/actions/authenAction';
import { loading } from '~/components/Loading/core';
import { toast } from '~/components/Toast/core';

export const registerUser = async (user, dispatch, navigator) => {
  try {
    loading.run();
    const res = await httpRequest.post(`/auth/register`, user);
    dispatch(registerSuccess(res));
    navigator('/login');
    loading.done();
  } catch (err) {
    dispatch(registerFailed(err.response.data));
    loading.done();
  }
};

export const loginUser = async (user, dispatch, navigator) => {
  try {
    loading.run();
    const res = await httpRequest.post(`/auth/login`, user, { withCredentials: true });
    dispatch(loginSuccess(res));
    navigator('/');
    loading.done();
  } catch (err) {
    console.log(err);
    dispatch(loginFailed(err?.response?.data));
    loading.done();
  }
};

export const logoutUser = async (dispatch, navigator) => {
  try {
    loading.run();
    await httpRequest.get(`/auth/logout`, { withCredentials: true });
    dispatch(logoutSuccess());
    navigator('/');
    loading.done();
  } catch (err) {
    console.log(err);
    dispatch(logoutFailed(err?.response?.data));
    loading.done();
    toast.error(err?.response?.data);
  }
};
