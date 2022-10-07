import {
  loginFailed,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
  registerFailed,
  registerSuccess,
} from '~/reducers/actions/authenAction';
import { updateCodeVia } from '~/reducers/actions/recoverAction';
import httpRequest from '~/utils/httpRequest';
import { getAccessToken } from '~/utils/localStorage';

import { loading } from '~/components/Loading/core';
import { notification } from '~/components/Modal/Notification/core';

export const registerUser = async (user, dispatch, navigator) => {
  try {
    loading.run();
    const res = await httpRequest.post(`/auth/register`, user);
    dispatch(registerSuccess(res));
    navigator('/login');
    loading.done();
  } catch (err) {
    dispatch(registerFailed(err.data));
    loading.done().error('Server Error', err.status === 504);
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
    dispatch(loginFailed(err.data));
    loading.done().error('Server Error', err.status === 504);
  }
};

export const loginGoogle = async (user, dispatch, navigator) => {
  try {
    loading.run();
    const res = await httpRequest.post(`/auth/login/google`, user, { withCredentials: true });
    dispatch(loginSuccess(res));
    navigator('/');
    loading.done();
  } catch (err) {
    console.log(err);
    dispatch(loginFailed(err?.data));
    loading.done().error('Server Error', err.status === 504);
  }
};

export const loginGithub = async (user, dispatch, navigator) => {
  try {
    loading.run();
    const res = await httpRequest.post(`/auth/login/github`, user, { withCredentials: true });
    dispatch(loginSuccess(res));
    navigator('/');
    loading.done();
  } catch (err) {
    console.log(err);
    dispatch(loginFailed(err.data));
    loading.done().error('Server Error', err.status === 504);
  }
};

export const loginFacebook = async (user, dispatch, navigator) => {
  try {
    loading.run();
    const res = await httpRequest.post(`/auth/login/facebook`, user, { withCredentials: true });
    dispatch(loginSuccess(res));
    navigator('/');
    loading.done();
  } catch (err) {
    dispatch(loginFailed(err.data));
    loading.done().error('Server Error', err.status === 504);
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

export const verifyEmail = async () => {
  try {
    loading.run();
    await httpRequest.get(`/auth/verify/email`, {
      headers: {
        token: `Bearer ${getAccessToken()}`,
      },
    });
    loading.done();
    notification.setTitle('A new verification link has been sent to the email addres.');
  } catch (err) {
    return loading.done().error(err.data);
  }
};

export const sendCodeViaEmail = async (email, navigator) => {
  try {
    loading.run();
    await httpRequest.post(`/auth/code/email`, { email });
    loading.done();
    navigator('/recover/code', { replace: true });
  } catch (err) {
    return loading.done().error(err.data);
  }
};

export const verifyCodeViaEmail = async (data, dispatch, navigator) => {
  try {
    loading.run();
    await httpRequest.post(`/auth/verify/code`, data);
    dispatch(updateCodeVia(data.code));
    navigator('/recover/password', { replace: true });
    loading.done();
  } catch (err) {
    return loading.done().error(err.data);
  }
};

export const changePasswordWithCodeVia = async (data, navigator) => {
  try {
    loading.run();
    await httpRequest.post(`/auth/recover/password`, data);
    navigator('/login', { replace: true });
    loading.done();
  } catch (err) {
    return loading.done().error(err.data);
  }
};
