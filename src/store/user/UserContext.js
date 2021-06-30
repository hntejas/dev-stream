import { createContext, useEffect, useReducer } from "react";
import userReducer from "./userReducer";
import * as userActionTypes from "./userActionTypes";
import { getUserData } from "../../services/user.service";
import { isLoggedInLocally } from "../../utils";

export const UserContext = createContext();

export const initialUserState = {
  isLoggedIn: isLoggedInLocally(),
  name: "",
  history: [],
  likedVideos: [],
  playlists: [],
};

export function UserContextProvider({ children }) {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);

  useEffect(async () => {
    if (user.isLoggedIn) {
      const response = await getUserData();
      if (response.success) {
        userDispatch({
          type: userActionTypes.UPDATE_USER_DATA,
          payload: {
            user: response.user,
            playlists: response.playlists,
          },
        });
      } else if (response.status == 401) {
        userDispatch({
          type: userActionTypes.UPDATE_USER_LOGIN,
          payload: {
            isLoggedIn: false,
          },
        });
      }
    } else {
    }
  }, [user.isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, userDispatch, userActionTypes }}>
      {children}
    </UserContext.Provider>
  );
}
