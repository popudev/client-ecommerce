import { createContext, useEffect, useReducer } from 'react';

import { loginSuccess } from '~/reducers/actions/authenAction';
import authenReducer, { initialState } from '~/reducers/authenReducer';
import { getInfoUser } from '~/services/userService';
import { getAccessToken } from '~/utils/localStorage';

export const GlobalStateContext = createContext();

export default function GlobalStateProvider({ children }) {
  const [globalState, dispatch] = useReducer(authenReducer, initialState);
  const currentUser = globalState.login.currentUser;

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

  return <GlobalStateContext.Provider value={{ globalState, dispatch }}>{children}</GlobalStateContext.Provider>;
}
