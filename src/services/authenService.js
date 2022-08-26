import httpRequest from '~/utils/httpRequest';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from '~/reducers/actions/authenAction';

export const registerUser = async (user, dispatch, navigator) => {
  try {
    dispatch(registerStart());
    const res = await httpRequest.post(`/auth/register`, user);
    dispatch(registerSuccess(res));
    navigator('/login');
  } catch (err) {
    dispatch(registerFailed(err.response.data));
  }
};

export const loginUser = async (user, dispatch, navigator) => {
  try {
    dispatch(loginStart());
    const res = await httpRequest.post(`/auth/login`, user, { withCredentials: true });
    dispatch(loginSuccess(res));
    navigator('/');
  } catch (err) {
    console.log(err);
    dispatch(loginFailed(err?.response?.data));
  }
};
