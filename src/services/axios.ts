import axios from 'axios';

const baseUri = process.env.NEXT_PUBLIC_BASE_URI ?? '';

const _axios = axios.create({
  baseURL: `${baseUri}/v1`,
});

export default _axios;
