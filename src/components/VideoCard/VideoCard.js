import "./video-card.css";
import { convertToShortNumber } from "../../utils";

export default function VideoCard({ video }) {
  const { embedId, title, views, channel, age, thumbnailImgUrl } = video;
  return (
    <div className="card video-card">
      <img className="card-video-thumbnail" alt={title} src={thumbnailImgUrl} />
      <div className="card-details">
        <p className="card-title">{title}</p>
        <p className="card-channel-title">{channel.title}</p>
        <div className="card-video-stats">
          <span className="card-video-views">
            {convertToShortNumber(views)} Views
          </span>{" "}
          • <span className="card-video-age">{age} ago</span>
        </div>
      </div>
    </div>
  );
}
