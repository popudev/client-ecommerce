import { loading } from '~/components/Loading/core';
import httpRequest from '~/utils/httpRequest';
import { getAccessToken } from '~/utils/localStorage';

export const getInfoUser = async () => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    const res = await httpRequest.get(`/user`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    loading.done();
    return res;
  } catch (err) {
    loading.done();
  }
};
