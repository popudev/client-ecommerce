import httpRequest from '~/utils/httpRequest';

export const getCategoryList = async () => {
  try {
    const res = await httpRequest.get(`/categories`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
