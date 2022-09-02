import { toast } from '~/components/Toast/core';
import httpRequest from '~/utils/httpRequest';

export const getProductList = async (filter, limit = 12) => {
  try {
    let params = {
      titleLike: filter?.title,
      categoryId: filter?.categoryId,
      sale_gte: filter?.price ? filter?.price[0] : 0,
      sale_lte: filter?.price ? filter?.price[1] : 999,
      page: filter?.page,
      limit: limit,
    };

    const sort = filter?.sort?.filter((e) => e.order);
    if (sort?.length) {
      params = {
        ...params,
        sort: sort.map((e) => e.type).join(','),
        order: sort.map((e) => e.order).join(','),
      };
    }

    const res = await httpRequest.get(`/product`, { params });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = async (data) => {
  try {
    const res = await httpRequest.post(`/product`, data);
    toast.success('Them san pham thanh cong');
  } catch (err) {
    console.log(err);
    toast.error('Co loi');
  }
};
