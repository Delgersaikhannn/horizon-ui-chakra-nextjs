import _axios from './axios';

const login = async (body: { email: string; password: string }) => {
  const res = await _axios.post('/login', body);

  return res.data;
};

const authValidate = async () => {
  const res = await _axios.get('/validate');

  return res.data;
};

export { login, authValidate };
