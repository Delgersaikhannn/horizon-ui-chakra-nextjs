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

const getCompanyDetail = async (id: string) => {
  const res = await _axios.get(`/companies/${id}`);

  return res.data;
};

const updateCompany = async (
  id: string,
  body: {
    email?: string;
    address?: string;
    name?: string;
    phone?: string;
    web?: string;
  },
) => {
  const res = await _axios.patch(`/companies/${id}`, body);

  return res.data;
};

export { companyList, getCompanyDetail, updateCompany };
