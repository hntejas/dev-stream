import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../store/UserContext/UserContext";
import { useData } from "../../../store/DataContext/DataContext";
import { showToast } from "../../../utils";
import VideoList from "../../VideoList/VideoList";

import * as userActionTypes from "../../../store/types/userActionTypes";

import "./playlist-videos.css";

export default function PlaylistVideos() {
  const { playlistId } = useParams();
  const { videos } = useData();
  const { user, userDispatch } = useContext(UserContext);

  let playlist = user.playlists.find((playlist) => playlist.id == playlistId);

  let videosToDisplay = [];
  videosToDisplay = getVideosToDisplay();

  function getVideosToDisplay() {
    videos.forEach((video) => {
      if (playlist.videos.includes(video.embedId)) {
        videosToDisplay.push(video);
      }
      if (videosToDisplay.length === playlist.videos.length) {
        return videosToDisplay;
      }
    });
    return videosToDisplay;
  }

  const onRemoveHandler = (e, embedId) => {
    e.preventDefault();
    const userConsent = confirm("Removing video from playlist, are you sure?");
    if (userConsent) {
      userDispatch({
        type: userActionTypes.REMOVE_FROM_PLAYLIST,
        payload: {
          playlistId: playlistId,
          videoEmbedId: embedId,
        },
      });
      showToast("Video removed");
    }
  };

  return (
    <div className="playlist-videos">
      <h2 className="section-heading">{playlist.name}</h2>
      <VideoList
        videos={videosToDisplay}
        onRemove={onRemoveHandler}
      ></VideoList>
    </div>
  );
}
