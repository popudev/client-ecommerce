import httpRequest from '~/utils/httpRequest';
import { toast } from '~/components/Toast/core';
import { loading } from '~/components/Loading/core';
import { getAccessToken } from '~/utils/localStorage';

export const addProductToCart = async (data) => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    await httpRequest.post(`/cart`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    loading.done();
    toast.success('Ban da them vao gio hang');
    return true;
  } catch (err) {
    console.log('err: ', err);
    loading.done();
    toast.error('Vui long dang nhap!!!');
    return false;
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
    loading.done();
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
    loading.done();
    toast.success('So luong da duoc cap nhat');
    return true;
  } catch (err) {
    loading.done();
    toast.error('Vui long dang nhap');
    return false;
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
    loading.done();
    toast.success('So luong da duoc cap nhat');
    return true;
  } catch (err) {
    loading.done();
    toast.error('Vui long dang nhap');
    return false;
  }
};
