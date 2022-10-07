export const initialState = {
  accountFound: null,
  code: null,
};

export default function recoverReducer(state, action) {
  switch (action.type) {
    case 'update_account':
      return {
        ...state,
        accountFound: action.payload,
      };
    case 'update_code_via':
      return {
        ...state,
        code: action.payload,
      };

    default:
      return state;
  }
}
