export const initialState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  register: {
    isFetching: false,
    username: false,
    error: false,
  },
};

const authenReducer = (state, action) => {
  switch (action.type) {
    case 'loginStart':
      return {
        ...state,
        login: {
          ...state.login,
          isFetching: true,
          error: false,
          currentUser: null,
        },
      };

    case 'loginSuccess':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return {
        ...state,
        login: {
          ...state.login,
          isFetching: false,
          error: false,
          currentUser: action.payload,
        },
      };

    case 'loginFailed':
      return {
        ...state,
        login: {
          ...state.login,
          isFetching: false,
          error: action.payload,
          currentUser: null,
        },
      };

    case 'registerStart':
      return {
        ...state,
        register: {
          ...state.register,
          isFetching: true,
        },
      };

    case 'registerSuccess':
      return {
        ...state,
        register: {
          ...state.register,
          isFetching: false,
          error: false,
          username: action.payload,
        },
      };

    case 'registerFailed':
      return {
        ...state,
        register: {
          ...state.register,
          isFetching: false,
          error: action.payload,
        },
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
