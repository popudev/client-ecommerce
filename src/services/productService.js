import checkStatusErrorApi from '~/utils/checkStatusErrorApi';
import httpRequest from '~/utils/httpRequest';

import { loading } from '~/components/Loading/core';

export const getProductList = async (filter, limit = 20, pagination = true) => {
  try {
    let params = {
      title: filter?.title,
      saleGte: filter?.price && filter?.price[0],
      saleLte: filter?.price && filter?.price[1],
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

    return pagination ? res : res?.payload;
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const getProductById = async (productId) => {
  try {
    loading.run();
    const res = await httpRequest.get(`/product/${productId}`);
    loading.done();
    return res;
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const getProductByTitle = async (title, limit = 10) => {
  try {
    const res = await httpRequest.get(`/product`, { params: { title, limit, page: 1 } });
    return res;
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const getProductsRandom = async (number) => {
  try {
    const res = await httpRequest.get(`/product/random`, { params: { number: number } });
    return res || [];
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

// export const addProduct = async (data) => {
//   try {
//     await httpRequest.post(`/product`, data);
//     toast.success('Them san pham thanh cong');
//   } catch (err) {
//     console.log(err);
//     toast.error('Co loi');
//   }
// };
