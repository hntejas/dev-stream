import { useContext } from "react";

import VideoList from "../VideoList/VideoList";
import { UserContext } from "../../store/UserContext/UserContext";
import { useData } from "../../store/DataContext/DataContext";

import "./history.css";

export default function History() {
  const { user } = useContext(UserContext);
  const { videos } = useData();

  let videosToDisplay = [];
  videosToDisplay = getVideosToDisplay();
  function getVideosToDisplay() {
    user.history.forEach((videoEmbedId) => {
      const historyVideo = videos.find(
        (currVideo) => currVideo.embedId === videoEmbedId
      );
      videosToDisplay.push(historyVideo);
      if (videosToDisplay.length === user.history.length) {
        return videosToDisplay;
      }
    });
    return videosToDisplay.reverse();
  }

  return (
    <div className="history-container">
      <h2 className="section-heading">Recent Videos</h2>

      {videosToDisplay && <VideoList videos={videosToDisplay} />}
    </div>
  );
}
