export const initState = {
  categoryId: [],
  price: [0, 9999],
  rams: [],
  roms: [],
  services: [],
  products: [],
  resetPrice: false,
  page: 1,
};

export default function shopReducer(state, action) {
  switch (action.type) {
    case 'add_category':
      return {
        ...state,
        categoryId: [...state.categoryId, action.payload],
      };

    case 'delete_category':
      return {
        ...state,
        categoryId: state.categoryId.filter((e) => e !== action.payload),
      };

    case 'add_ram':
      return {
        ...state,
        rams: [...state.rams, action.payload],
      };

    case 'delete_ram':
      return {
        ...state,
        rams: state.rams.filter((e) => e !== action.payload),
      };

    case 'add_rom':
      return {
        ...state,
        roms: [...state.roms, action.payload],
      };

    case 'delete_rom':
      return {
        ...state,
        roms: state.roms.filter((e) => e !== action.payload),
      };

    case 'add_service':
      return {
        ...state,
        services: [...state.services, action.payload],
      };

    case 'delete_service':
      return {
        ...state,
        services: state.services.filter((e) => e !== action.payload),
      };

    case 'change_price':
      return {
        ...state,
        price: action.payload,
      };

    case 'clear_filter':
      return {
        ...initState,
        resetPrice: !state.resetPrice,
      };

    default:
      return state;
  }
}
