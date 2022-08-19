export const initialState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
};

const authenReducer = (state, action) => {
  switch (action.type) {
    case 'loginStart':
      return {
        ...state,
        isFetching: true,
      };

    case 'loginSuccess':
      return {
        ...state,
        login: { ...state.login, isFetching: false, currentUser: action.payload },
      };

    case 'loginFailed':
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case 'logoutStart':
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case 'logoutSuccess':
      console.log(action.payload);
      return {
        ...state,
        login: { ...state.login, isFetching: false, currentUser: action.payload },
      };

    case 'logoutFailed':
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default authenReducer;
