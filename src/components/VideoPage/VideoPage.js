import { useParams } from "react-router-dom";
import "./video-page.css";

export default function VideoPage() {
  const params = useParams();

  return (
    <div className="video-page-container">
      <div className="video-page-left">
        <div className="video-wrapper">
          <iframe
            className="iframe-video"
            src={"https://www.youtube.com/embed/" + params.embedId}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
