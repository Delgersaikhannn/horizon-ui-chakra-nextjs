import _axios from './axios';

type companyListProps = {
  q?: any;
  page?: number;
  pageby?: number;
  resourceID?: string;
};

const scansList = async (body: companyListProps) => {
  const { q, page, pageby, resourceID } = body;
  const res = await _axios.get('/scans', {
    params: {
      q,
      page,
      pageby,
      resourceID,
    },
  });

  return res.data;
};

export { scansList };
