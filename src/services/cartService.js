import httpRequest from '~/utils/httpRequest';
import { toast } from '~/components/Toast/core';

export const addProductToCart = async (data) => {
  try {
    const accessToken = JSON.parse(localStorage.getItem('currentUser'))?.accessToken || '';
    await httpRequest.post(`/cart`, data, {
      headers: {
        token: `Bear ${accessToken}`,
      },
    });
    toast.success('Ban da them vao gio hang');
  } catch (err) {
    toast.error('Vui long dang nhap');
  }
};

export const getProductsCart = async () => {
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

export const deleteProduct = async (id) => {
  try {
    const accessToken = JSON.parse(localStorage.getItem('currentUser'))?.accessToken || '';
    const res = await httpRequest.delete(`/cart/product/${id}`, {
      headers: {
        token: `Bear ${accessToken}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
