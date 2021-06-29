import * as userActionTypes from "../types/userActionTypes";

const updateUserLogin = (state, { isLoggedIn, name }) => {
  if (!isLoggedIn) {
    localStorage.removeItem("cssFightAuth");
  }
  return {
    ...state,
    isLoggedIn: isLoggedIn,
    name: isLoggedIn ? name : "",
  };
};

const toggleLikedVideo = (state, { videoEmbedId, isVideoAlreadyLiked }) => {
  const stateCopy = { ...state };
  if (isVideoAlreadyLiked) {
    stateCopy.likedVideos = state.likedVideos.filter(
      (embedId) => embedId !== videoEmbedId
    );
  } else {
    stateCopy.likedVideos = state.likedVideos.concat(videoEmbedId);
  }
  return stateCopy;
};

const updateHistory = (state, { videoEmbedId }) => {
  const stateCopy = { ...state };
  const newHistory = state.history.filter(
    (embedId) => embedId !== videoEmbedId
  );
  newHistory.push(videoEmbedId);
  stateCopy.history = newHistory;
  return stateCopy;
};

const createPlaylist = (state, { playlistName }) => {
  const stateCopy = { ...state };

  stateCopy.playlists = state.playlists.concat({
    id: state.playlists.length + 1 || 1,
    name: playlistName,
    videos: [],
  });

  return stateCopy;
};

const addToPlaylist = (state, { playlistId, videoEmbedId }) => {
  const stateCopy = { ...state };
  stateCopy.playlists = state.playlists.map((playlist) => {
    const playlistCopy = { ...playlist };
    if (playlist.id == playlistId) {
      playlistCopy.videos = [...playlist.videos, videoEmbedId];
    }
    return playlistCopy;
  });
  return stateCopy;
};

const removeFromPlaylist = (state, { playlistId, videoEmbedId }) => {
  const stateCopy = { ...state };
  stateCopy.playlists = state.playlists.map((playlist) => {
    const playlistCopy = { ...playlist };
    if (playlist.id == playlistId) {
      playlistCopy.videos = playlist.videos.filter(
        (embedId) => embedId !== videoEmbedId
      );
    }
    return playlistCopy;
  });
  return stateCopy;
};

export default function userReducer(state, action) {
  switch (action.type) {
    case userActionTypes.UPDATE_USER_LOGIN:
      return updateUserLogin(state, action.payload);
    case userActionTypes.TOGGLE_LIKED_VIDEO:
      return toggleLikedVideo(state, action.payload);
    case userActionTypes.UPDATE_HISTORY:
      return updateHistory(state, action.payload);
    case userActionTypes.CREATE_PLAYLIST:
      return createPlaylist(state, action.payload);
    case userActionTypes.ADD_TO_PLAYLIST:
      return addToPlaylist(state, action.payload);
    case userActionTypes.REMOVE_FROM_PLAYLIST:
      return removeFromPlaylist(state, action.payload);
    default:
      return state;
  }
}
