import httpRequest from '~/utils/httpRequest';
import { toast } from '~/components/Toast/core';
import { loading } from '~/components/Loading/core';

export const addProductToCart = async (data) => {
  try {
    loading.run();
    const accessToken = JSON.parse(localStorage.getItem('currentUser'))?.accessToken || '';
    await httpRequest.post(`/cart`, data, {
      headers: {
        token: `Bear ${accessToken}`,
      },
    });
    loading.done();
    toast.success('Ban da them vao gio hang');
    return true;
  } catch (err) {
    loading.done();
    toast.error('Vui long dang nhap');
    return false;
  }
};

export const getInfoCart = async () => {
  try {
    const accessToken = JSON.parse(localStorage.getItem('currentUser'))?.accessToken || '';
    const res = await httpRequest.get(`/cart`, {
      headers: {
        token: `Bear ${accessToken}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductToCart = async (id) => {
  try {
    loading.run();
    const accessToken = JSON.parse(localStorage.getItem('currentUser'))?.accessToken || '';
    await httpRequest.delete(`/cart/product/${id}`, {
      headers: {
        token: `Bear ${accessToken}`,
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
    const accessToken = JSON.parse(localStorage.getItem('currentUser'))?.accessToken || '';
    await httpRequest.post(`/cart`, data, {
      headers: {
        token: `Bear ${accessToken}`,
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
