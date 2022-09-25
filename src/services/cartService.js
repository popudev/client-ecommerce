import config from '~/config';
import httpRequest from '~/utils/httpRequest';
import { getAccessToken } from '~/utils/localStorage';

import { loading } from '~/components/Loading/core';

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
    return err.status === 401
      ? loading.done().error(config.notifications.auth.unauth)
      : loading.done().error(config.notifications.server.error);
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
    return err.status === 401
      ? loading.done().error(config.notifications.auth.unauth)
      : loading.done().error(config.notifications.server.error);
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
    return err.status === 401
      ? loading.done().error(config.notifications.auth.unauth)
      : loading.done().error(config.notifications.server.error);
  }
};

export const changeQuantityToCart = async (data) => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    await httpRequest.post(`/cart`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return loading.done().success(config.notifications.cart.change);
  } catch (err) {
    return err.status === 401
      ? loading.done().error(config.notifications.auth.unauth)
      : loading.done().error(config.notifications.server.error);
  }
};
