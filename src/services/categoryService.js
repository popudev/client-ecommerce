import httpRequest from '~/utils/httpRequest';

export const getCategoryList = async () => {
  try {
    const res = await httpRequest.get(`/category`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
