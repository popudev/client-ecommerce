import config from '~/config';
import { checkOutFailed } from '~/reducers/actions/checkOutAction';
import checkStatusErrorApi from '~/utils/checkStatusErrorApi';
import httpRequest from '~/utils/httpRequest';
import { getAccessToken } from '~/utils/localStorage';

import { loading } from '~/components/Loading/core';

export const addOrder = async (data, dispatch, navigator) => {
  try {
    loading.run();

    const accessToken = getAccessToken();
    const res = await httpRequest.post(`/order`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    loading.done();
    navigator(`/checkout/complete/${res._id}`);
  } catch (err) {
    dispatch(checkOutFailed());
    return checkStatusErrorApi(err);
  }
};

export const getOrderList = async (statusFilter, page, limit = 5) => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    const res = await httpRequest.get(`/order`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
      params: {
        status: statusFilter,
        limit,
        page,
      },
    });
    loading.done();
    return res;
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const getOrderById = async (orderId) => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    const res = await httpRequest.get(`/order/${orderId}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    loading.done();
    return res;
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    await httpRequest.patch(
      `/order`,
      { id, status },
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    );
    return loading.done().success('Updated Order Status');
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};
