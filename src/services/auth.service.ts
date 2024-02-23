import _axios from './axios';

const login = async (body: { email: string; password: string }) => {
  const res = await _axios.post('/login', body);

  return res.data;
};

const authValidate = async () => {
  const res = await _axios.get('/validate');

  return res.data;
};

const logoutService = async () => {
  const res = await _axios.get('/logout');

  return res.data;
};

export { login, authValidate, logoutService };
