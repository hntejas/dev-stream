import { videos } from "../../data";
import { useParams } from "react-router-dom";
import VideoCard from "../VideoCard/VideoCard";
import { convertToShortNumber } from "../../utils";
import "./video-page.css";

export default function VideoPage() {
  const { embedId } = useParams();

  const { title, views, age, channel } = videos.find(
    (video) => video.embedId === embedId
  );

  return (
    <div className="video-page-container">
      <div className="video-page-left">
        <div className="video-wrapper">
          <iframe
            className="iframe-video"
            src={"https://www.youtube.com/embed/" + embedId}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-details">
          <img src={channel.logo} className="channel-logo"></img>
          <div className="card-video-stats">
            <p>{title}</p>
            <span className="card-video-views">
              {convertToShortNumber(views)} views
            </span>{" "}
            • <span className="card-video-age">{channel.title}</span> •{" "}
            <span className="card-video-age">{age} ago</span>
          </div>
        </div>
      </div>
      <div className="video-page-suggestion">
        <h3 className="video-suggestion-heading">Next Videos</h3>
        {videos.map((video) => {
          if (video.embedId === embedId) {
            return null;
          }
          return <VideoCard video={video} />;
        })}
      </div>
    </div>
  );
}
