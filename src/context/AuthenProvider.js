import { createContext, useEffect, useReducer } from 'react';

import { loginSuccess } from '~/reducers/actions/authenAction';
import authenReducer, { initialState } from '~/reducers/authenReducer';
import { getInfoUser } from '~/services/userService';
import { getAccessToken } from '~/utils/localStorage';

export const AuthenContext = createContext();

export default function AuthenProvider({ children }) {
  const [authenState, authenDispatch] = useReducer(authenReducer, initialState);
  const currentUser = authenState.login.currentUser;

  // stay logged in
  useEffect(() => {
    const fetchGetInfoUser = async () => {
      const infoUser = await getInfoUser();
      if (infoUser)
        authenDispatch(
          loginSuccess({
            ...infoUser,
            accessToken: getAccessToken(),
          }),
        );
    };

    if (!currentUser && getAccessToken()) fetchGetInfoUser();
  }, [currentUser, authenDispatch]);

  return (
    <AuthenContext.Provider value={{ authenState, authenDispatch }}>
      {children}
    </AuthenContext.Provider>
  );
}
