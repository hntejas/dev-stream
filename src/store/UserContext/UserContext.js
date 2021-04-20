import { createContext, useReducer } from "react";
import userReducer from "./userReducer";

export const UserContext = createContext();

export const initialUserState = {
  history: [],
  likedVideos: [],
  playlists: [
    {
      id: 1,
      name: "Playlist 1",
      videos: ["iiADhChRriM"],
    },
  ],
};

export function UserContextProvider({ children }) {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}
