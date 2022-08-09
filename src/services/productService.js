import httpRequest from '~/utils/httpRequest';

export const getProductList = async (filter, limit = 12) => {
  try {
    const params = {
      categoryId: filter.categoryId,
      sale_gte: filter.price[0],
      sale_lte: filter.price[1],
      _page: filter.page,
      _limit: limit,
    };
    const res = await httpRequest.get(`/products`, { params: params });
    return res;
  } catch (err) {
    console.log(err);
  }
};
