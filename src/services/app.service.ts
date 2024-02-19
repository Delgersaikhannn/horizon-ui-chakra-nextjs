import _axios from './axios';

const getReport = async () => {
  const res = await _axios.get('/reports/counts');

  return res.data;
};

export { getReport };
