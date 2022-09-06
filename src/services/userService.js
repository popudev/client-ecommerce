import { toast } from '~/components/Toast/core';
import httpRequest from '~/utils/httpRequest';
import { getCurrentUser } from '~/utils/localStorage';

export const getInfoUser = async () => {
  try {
    const accessToken = getCurrentUser().accessToken || '';
    const res = await httpRequest.get(`/user`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (err) {}
};
