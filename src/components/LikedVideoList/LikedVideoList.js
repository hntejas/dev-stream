import { useContext } from "react";

import VideoList from "../VideoList/VideoList";
import { UserContext } from "../../store/UserContext/UserContext";

import { videos } from "../../data";

import "./liked-video-list.css";

export default function LikedVideoList() {
  const { user } = useContext(UserContext);

  let videosToDisplay = [];
  videosToDisplay = getVideosToDisplay();
  function getVideosToDisplay() {
    videos.forEach((video) => {
      if (user.likedVideos.includes(video.embedId)) {
        videosToDisplay.push(video);
      }
      if (videosToDisplay.length === user.likedVideos.length) {
        return videosToDisplay;
      }
    });
    return videosToDisplay;
  }

  return (
    <div className="liked-video-container">
      <h2 className="section-heading">Liked Videos</h2>

      {videosToDisplay && <VideoList videos={videosToDisplay} />}
    </div>
  );
}
