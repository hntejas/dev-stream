import "./video-card.css";
import { convertToShortNumber } from "../../utils";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  const { id, embedId, title, views, channel, age, thumbnailImgUrl } = video;
  return (
    <Link
      to={"/video/" + embedId}
      className="card video-card"
      key={"suggestion" + id}
    >
      <img className="card-video-thumbnail" alt={title} src={thumbnailImgUrl} />
      <div className="card-details">
        <p className="card-title">{title}</p>
        <p className="card-channel-title">{channel.title}</p>
        <div className="card-video-stats">
          <span className="card-video-views">
            {convertToShortNumber(views)} views
          </span>{" "}
          • <span className="card-video-age">{age} ago</span>
        </div>
      </div>
    </Link>
  );
}
