import _axios from './axios';

type userListProps = {
  q?: any;
  page?: number;
  pageby?: number;
};

const fetchUserList = async (body: userListProps) => {
  const { q, page, pageby } = body;
  const res = await _axios.get('/profiles', {
    params: {
      q,
      page,
      pageby,
    },
  });

  return res.data;
};

const fetchUserDetail = async (id: string) => {
  const res = await _axios.get(`/profiles/${id}`);

  return res.data;
};

const updateUser = async (id: string, body: { phone: string }) => {
  const res = await _axios.patch(`/profiles/${id}`, body);

  return res.data;
};

const createUser = async (body: {
  phone: string;
  password: string;
  email: string;
}) => {
  const res = await _axios.post(`/profiles`, body);

  return res.data;
};
export { fetchUserList, fetchUserDetail, updateUser, createUser };
