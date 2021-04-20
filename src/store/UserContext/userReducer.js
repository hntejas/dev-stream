import * as userActionTypes from "../types/userActionTypes";

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

export default function userReducer(state, action) {
  switch (action.type) {
    case userActionTypes.TOGGLE_LIKED_VIDEO:
      return toggleLikedVideo(state, action.payload);
    case userActionTypes.UPDATE_HISTORY:
      return updateHistory(state, action.payload);
    default:
      return state;
  }
}
