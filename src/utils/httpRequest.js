import axios from 'axios';
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import { getCurrentUser, setCurrentUser } from './localStorage';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

httpRequest.interceptors.request.use(async (config) => {
  const token = config.headers.token;
  if (!token) return config;
  const accessToken = token.split(' ')[1];
  if (!accessToken) return config;

  // Handle token here ...
  const date = new Date();
  const decodedToken = jwtDecode(accessToken);
  if (decodedToken.exp < date.getTime() / 1000) {
    const res = await httpRequest.get('/auth/refreshToken', { withCredentials: true });
    if (!res) return config;

    const currentUser = getCurrentUser();
    setCurrentUser({
      ...currentUser,
      accessToken: res.accessToken,
    });

    config.headers['token'] = `Bearer ${res.accessToken}`;
  }

  return config;
});

httpRequest.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);

export default httpRequest;
