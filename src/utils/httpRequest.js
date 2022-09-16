import axios from 'axios';
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import { setAccessToken } from './localStorage';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

httpRequest.interceptors.request.use(async (config) => {
  // const token = config.headers.token;
  // if (!token) return config;
  // const accessToken = token.split(' ')[1];
  // if (!accessToken) return config;

  // // Handle token here ...
  // const date = new Date();
  // const decodedToken = jwtDecode(accessToken);

  // if (decodedToken.exp < date.getTime() / 1000) {

  //   const res = await httpRequest.get('/auth/refreshToken', { withCredentials: true });
  //   if (!res) return config;

  //   setAccessToken(res.accessToken || '');

  //   config.headers['token'] = `Bearer ${res.accessToken}`;
  // }

  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

httpRequest.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((accessToken) => {
            originalRequest.headers['token'] = 'Bearer ' + accessToken;
            return httpRequest(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        axios
          .get('http://localhost:8000/auth/refreshToken', { withCredentials: true })
          .then(({ data }) => {
            setAccessToken(data.accessToken);
            originalRequest.headers['token'] = 'Bearer ' + data.accessToken;

            processQueue(null, data.accessToken);
            resolve(httpRequest(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export default httpRequest;
