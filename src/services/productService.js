import { loading } from '~/components/Loading/core';
import { toast } from '~/components/Toast/core';
import httpRequest from '~/utils/httpRequest';

export const getProductList = async (filter, limit = 12) => {
  try {
    let params = {
      title: filter?.title,
      saleGte: filter?.price[0],
      saleLte: filter?.price[1],
      page: filter?.page || 1,
      limit: limit,
    };

    if (filter?.listCategoryId?.length) {
      params = {
        ...params,
        listCategoryId: filter.listCategoryId.join(','),
      };
    }

    const sort = filter?.sort?.filter((e) => e.order);
    if (sort?.length) {
      params = {
        ...params,
        sort: sort.map((e) => e.type).join(','),
        order: sort.map((e) => e.order).join(','),
      };
    }

    loading.run();
    const res = await httpRequest.get(`/product`, { params });

    loading.done();

    return res;
  } catch (err) {
    loading.done();
    console.log(err);
  }
};

export const addProduct = async (data) => {
  try {
    await httpRequest.post(`/product`, data);
    toast.success('Them san pham thanh cong');
  } catch (err) {
    console.log(err);
    toast.error('Co loi');
  }
};

export const getProductById = async (productId) => {
  try {
    const res = await httpRequest.get(`/product/${productId}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
