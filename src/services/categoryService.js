import checkStatusErrorApi from '~/utils/checkStatusErrorApi';
import httpRequest from '~/utils/httpRequest';

export const getCategoryList = async () => {
  try {
    const res = await httpRequest.get(`/category`);
    return res;
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};
