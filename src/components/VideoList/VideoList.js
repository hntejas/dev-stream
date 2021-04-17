import VideoCard from "../VideoCard/VideoCard";
import "./video-list.css";

export default function VideoList({ videos }) {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoCard video={video} key={video.id} />
      ))}
    </div>
  );
}
