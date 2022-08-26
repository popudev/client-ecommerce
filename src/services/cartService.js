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
