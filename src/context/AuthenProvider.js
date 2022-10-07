import { createContext, useEffect, useReducer } from 'react';

import { loginSuccess } from '~/reducers/actions/authenAction';
import authenReducer, { initialState } from '~/reducers/authenReducer';
import { getInfoUser } from '~/services/userService';
import { getAccessToken } from '~/utils/localStorage';

export const AuthenContext = createContext();

export default function AuthenProvider({ children }) {
  const [authenState, dispatch] = useReducer(authenReducer, initialState);
  const currentUser = authenState.login.currentUser;

  // stay logged in
  useEffect(() => {
    const fetchGetInfoUser = async () => {
      const infoUser = await getInfoUser();
      if (infoUser)
        dispatch(
          loginSuccess({
            ...infoUser,
            accessToken: getAccessToken(),
          }),
        );
    };

    if (!currentUser && getAccessToken()) fetchGetInfoUser();
  }, [currentUser, dispatch]);

  return <AuthenContext.Provider value={{ authenState, dispatch }}>{children}</AuthenContext.Provider>;
}
