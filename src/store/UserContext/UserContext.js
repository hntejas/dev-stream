import { createContext, useReducer } from "react";
import userReducer from "./userReducer";

export const UserContext = createContext();

export const initialUserState = {
  history: [],
  likedVideos: ["No8qdcVYiQw", "u6_a0d94A1Q"],
  playlists: [
    {
      id: 1,
      name: "Playlist 1",
      videos: ["KUJsaM-hAjs", "Vi4Pr8bUMZs"],
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
