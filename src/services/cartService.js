import config from '~/config';
import checkStatusErrorApi from '~/utils/checkStatusErrorApi';
import httpRequest from '~/utils/httpRequest';
import { getAccessToken } from '~/utils/localStorage';

import { loading } from '~/components/Loading/core';
import { notification } from '~/components/Notification/core';

export const addProductToCart = async (data) => {
  try {
    loading.run();

    const accessToken = getAccessToken();
    await httpRequest.post(`/cart`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });

    return loading.done().success(config.notifications.cart.add);
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const getInfoCart = async () => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    const res = await httpRequest.get(`/cart`, {
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

export const deleteProductToCart = async (id) => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    await httpRequest.delete(`/cart/product/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return loading.done().success(config.notifications.cart.delete);
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const changeQuantityToCart = async (data) => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    await httpRequest.patch(`/cart`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return loading.done().success(config.notifications.cart.change);
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};
