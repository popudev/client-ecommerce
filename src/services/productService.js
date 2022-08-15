import httpRequest from '~/utils/httpRequest';

export const getProductList = async (filter, limit = 12) => {
  try {
    let params = {
      title_like: filter?.title,
      categoryId: filter?.categoryId,
      sale_gte: filter?.price ? filter?.price[0] : 0,
      sale_lte: filter?.price ? filter?.price[1] : 999,
      _page: filter?.page,
      _limit: limit,
    };

    const sort = filter?.sort?.filter((e) => e.order);
    if (sort?.length) {
      params = {
        ...params,
        _sort: sort.map((e) => e.type).join(','),
        _order: sort.map((e) => e.order).join(','),
      };
    }

    const res = await httpRequest.get(`/products`, { params });
    return res;
  } catch (err) {
    console.log(err);
  }
};
