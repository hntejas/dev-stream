import * as userActionTypes from "./userActionTypes";

const updateUserLogin = (state, { isLoggedIn, name }) => {
  if (!isLoggedIn) {
    localStorage.removeItem("devStreamAuth");
  }
  return {
    ...state,
    isLoggedIn: isLoggedIn,
    name: isLoggedIn ? name : "",
  };
};

const loadUserData = (state, { user, playlists }) => {
  return { ...state, ...user, playlists: playlists };
};

const toggleLikedVideo = (state, { video, isVideoAlreadyLiked }) => {
  const stateCopy = { ...state };
  if (isVideoAlreadyLiked) {
    stateCopy.likedVideos = state.likedVideos.filter(
      (likedVideo) => likedVideo.embedId !== video.embedId
    );
  } else {
    stateCopy.likedVideos = state.likedVideos.concat(video);
  }
  return stateCopy;
};

const updateHistory = (state, { video }) => {
  const stateCopy = { ...state };
  const newHistory = state.history.filter(
    (historyVideo) => historyVideo.embedId !== video.embedId
  );
  newHistory.push(video);
  stateCopy.history = newHistory;
  return stateCopy;
};

const createPlaylist = (state, { playlistId, playlistName }) => {
  const stateCopy = { ...state };

  stateCopy.playlists = state.playlists.concat({
    id: playlistId,
    name: playlistName,
    videos: [],
  });

  return stateCopy;
};

const updatePlaylistName = (state, { playlistId, playlistName }) => {
  const stateCopy = { ...state };

  stateCopy.playlists = state.playlists.map((playlist) => {
    if (playlist.id === playlistId) {
      playlist.name = playlistName;
    }
    return playlist;
  });

  return stateCopy;
};

const removePlaylist = (state, { playlistId }) => {
  const stateCopy = { ...state };

  stateCopy.playlists = state.playlists.filter(
    (playlist) => playlist.id !== playlistId
  );

  return stateCopy;
};

const addToPlaylist = (state, { playlistId, video }) => {
  const stateCopy = { ...state };
  stateCopy.playlists = state.playlists.map((playlist) => {
    const playlistCopy = { ...playlist };
    if (playlist.id == playlistId) {
      playlistCopy.videos = [...playlist.videos, video];
    }
    return playlistCopy;
  });
  return stateCopy;
};

const removeFromPlaylist = (state, { playlistId, video }) => {
  const stateCopy = { ...state };
  stateCopy.playlists = state.playlists.map((playlist) => {
    const playlistCopy = { ...playlist };
    if (playlist.id == playlistId) {
      playlistCopy.videos = playlist.videos.filter(
        (playlistVideo) => playlistVideo.embedId !== video.embedId
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
    case userActionTypes.UPDATE_USER_DATA:
      return loadUserData(state, action.payload);
    case userActionTypes.TOGGLE_LIKED_VIDEO:
      return toggleLikedVideo(state, action.payload);
    case userActionTypes.UPDATE_HISTORY:
      return updateHistory(state, action.payload);
    case userActionTypes.CREATE_PLAYLIST:
      return createPlaylist(state, action.payload);
    case userActionTypes.UPDATE_PLAYLIST_NAME:
      return updatePlaylistName(state, action.payload);
    case userActionTypes.REMOVE_PLAYLIST:
      return removePlaylist(state, action.payload);
    case userActionTypes.ADD_TO_PLAYLIST:
      return addToPlaylist(state, action.payload);
    case userActionTypes.REMOVE_FROM_PLAYLIST:
      return removeFromPlaylist(state, action.payload);
    default:
      return state;
  }
}
