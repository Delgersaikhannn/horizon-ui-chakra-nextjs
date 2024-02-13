import _axios from './axios';

type companyListProps = {
  q?: any;
  page?: number;
  pageby?: number;
  companyID?: string;
};

const resourceList = async (body: companyListProps) => {
  const { q, page, pageby, companyID } = body;
  const res = await _axios.get('/resources', {
    params: {
      q,
      page,
      pageby,
      companyID,
    },
  });

  return res.data;
};

export { resourceList };
