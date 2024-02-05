import axios from 'axios';
import Cookies from 'js-cookie';
import { path } from 'rambda';

const baseUri = process.env.NEXT_PUBLIC_BASE_URI ?? '';

const _axios = axios.create({
  baseURL: `${baseUri}/v1`,
});

_axios.interceptors.request.use(
  (config: any) => {
    const accessToken = Cookies.get('auth_token');
    if (accessToken) config.headers.Authorization = accessToken ?? '';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// _axios.interceptors.response.use(
//   function (response: any) {
//     return response.data;
//   },
//   function (error: any) {
//     const statusCode = path('response.status', error);
//     if (statusCode === 401) {
//       Cookies.remove('auth_token');
//     }
//     return Promise.reject(path('response.data', error));
//   },
// );

export default _axios;
