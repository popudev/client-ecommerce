export const updateTotalPriceDiscountProducts = (totalPrice, discount, products) => {
  return {
    type: 'update_total_price_and_discount_and_products',
    payload: {
      totalPrice,
      discount,
      products,
    },
  };
};

export const updateAddress = (payload) => {
  return {
    type: 'update_address',
    payload,
  };
};

export const updateShipping = (payload) => {
  return {
    type: 'update_shipping',
    payload,
  };
};

export const updatePayment = (payload) => {
  return {
    type: 'update_payment',
    payload,
  };
};

export const checkOutSuccess = (payload) => {
  return {
    type: 'checkOutSuccess',
    payload,
  };
};

export const checkOutFailed = () => {
  return {
    type: 'checkOutFailed',
  };
};

export const resetState = () => {
  return {
    type: 'resetState',
  };
};
