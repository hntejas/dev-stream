import VideoList from "../VideoList/VideoList";
import { useUser } from "../../store/user";

import "./liked-video-list.css";

export default function LikedVideoList() {
  const { user } = useUser();

  return (
    <div className="liked-video-container">
      <h2 className="section-heading">Liked Videos</h2>
      <VideoList videos={user.likedVideos} />
    </div>
  );
}
