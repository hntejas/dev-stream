import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../store/UserContext/UserContext";
import { videos } from "../../../data";
import VideoList from "../../VideoList/VideoList";

import "./playlist-videos.css";

export default function PlaylistVideos() {
  const { playlistId } = useParams();
  const { user } = useContext(UserContext);

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

  return (
    <div className="playlist-videos">
      <h2 className="section-heading">{playlist.name}</h2>
      <VideoList videos={videosToDisplay}></VideoList>
    </div>
  );
}
