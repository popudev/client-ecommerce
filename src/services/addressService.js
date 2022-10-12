import { checkOutFailed } from '~/reducers/actions/checkOutAction';
import checkStatusErrorApi from '~/utils/checkStatusErrorApi';
import httpRequest from '~/utils/httpRequest';
import { getAccessToken } from '~/utils/localStorage';

import { loading } from '~/components/Loading/core';

export const getAddress = async () => {
  try {
    const res = await httpRequest.get('/address', {
      headers: {
        token: 'Bearer ' + getAccessToken(),
      },
    });

    return res;
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const addAddress = async (address) => {
  try {
    loading.run();
    await httpRequest.post('/address', address, {
      headers: {
        token: 'Bearer ' + getAccessToken(),
      },
    });
    return loading.done().success('Added An Address');
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const updateAddress = async (address) => {
  try {
    loading.run();
    await httpRequest.patch('/address', address, {
      headers: {
        token: 'Bearer ' + getAccessToken(),
      },
    });
    return loading.done().success('Updated Address');
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const updateAddressDefault = async (address) => {
  try {
    loading.run();
    await httpRequest.patch('/address/default', address, {
      headers: {
        token: 'Bearer ' + getAccessToken(),
      },
    });
    return loading.done().success('Updated Address');
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const deleteAddress = async (id) => {
  try {
    loading.run();
    await httpRequest.delete(`/address/${id}`, {
      headers: {
        token: 'Bearer ' + getAccessToken(),
      },
    });
    return loading.done().success('Deleted Address');
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};
