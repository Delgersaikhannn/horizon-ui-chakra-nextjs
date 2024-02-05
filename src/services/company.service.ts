import _axios from './axios';

type companyListProps = {
  q?: any;
  page?: number;
  pageby?: number;
};

const companyList = async (body: companyListProps) => {
  const { q, page, pageby } = body;
  const res = await _axios.get('/companies', {
    params: {
      q,
      page,
      pageby,
    },
  });

  return res.data;
};

export { companyList };
