import axios from 'axios';
import queryString from 'query-string';

const httpRequest = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

httpRequest.interceptors.request.use(async (config) => {
  // Handle token here ...
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
