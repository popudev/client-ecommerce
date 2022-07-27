import httpRequest from '~/utils/httpRequest';

export const getProductList = async () => {
  try {
    const res = await httpRequest.get('/products');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (id) => {
  try {
    await httpRequest.delete(`/products/${id}`);
  } catch (err) {
    console.log(err);
  }
};
