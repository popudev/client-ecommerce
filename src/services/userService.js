import { loading } from '~/components/Loading/core';
import { toast } from '~/components/Toast/core';
import httpRequest from '~/utils/httpRequest';
import { getCurrentUser } from '~/utils/localStorage';

export const getInfoUser = async () => {
  try {
    loading.run();
    const accessToken = getCurrentUser().accessToken || '';
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
