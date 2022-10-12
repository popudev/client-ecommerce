export const initialState = {
  products: [],
  address: null,
  totalPrice: null,
  discount: null,
  shipping: null,
  total: null,
  success: false,
  error: false,
};

export default function checkOutReducer(state, action) {
  switch (action.type) {
    case 'update_total_price_and_discount_and_products':
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
        discount: action.payload.discount,
        products: action.payload.products,
        total: action.payload.totalPrice - action.payload.discount,
      };

    case 'update_address':
      return {
        ...state,
        address: action.payload,
      };

    case 'update_shipping':
      return {
        ...state,
        shipping: action.payload,
        total: state.totalPrice - state.discount + (action.payload?.charge || 0),
      };

    case 'checkOutSuccess':
      return {
        ...state,
        success: true,
        error: false,
      };

    case 'checkOutFailed':
      return {
        ...initialState,
        error: true,
        success: false,
      };

    case 'resetState':
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
