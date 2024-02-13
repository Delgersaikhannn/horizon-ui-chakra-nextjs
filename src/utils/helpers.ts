const formatData = (data: any) => {
  switch (typeof data) {
    case 'boolean':
      return data ? 'TRUE' : 'FALSE';

    default:
      return data;
  }
};
export { formatData };
