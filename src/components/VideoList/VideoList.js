import VideoCard from "../VideoCard/VideoCard";
import "./video-list.css";

export default function VideoList({ videos, onRemove }) {
  return (
    <div className="video-list">
      {videos &&
        videos.map((video) => (
          <VideoCard video={video} key={video.id} onRemove={onRemove} />
        ))}
    </div>
  );
}
