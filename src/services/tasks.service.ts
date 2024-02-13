import _axios from './axios';

type companyListProps = {
  q?: any;
  page?: number;
  pageby?: number;
  resourceID?: string;
};

const tasksList = async (body: companyListProps) => {
  const { page, pageby, resourceID } = body;
  const res = await _axios.get('/tasks', {
    params: {
      page,
      pageby,
      resourceID,
    },
  });

  return res.data;
};

export { tasksList };
