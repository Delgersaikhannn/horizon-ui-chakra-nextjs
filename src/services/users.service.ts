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

export { fetchUserList, fetchUserDetail };
