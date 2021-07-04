import { Link } from "react-router-dom";

import { useUser } from "../../../store/user";
import { useData } from "../../../store/data";
import { RiPlayListAddFill } from "react-icons/ri";

import "./playlist-page.css";

export default function PlaylistPage() {
  const { user } = useUser();
  const { videos } = useData();

  return (
    <>
      <h2 className="section-heading">Playlist</h2>

      <div className="playlist-container">
        {user.playlists.map((playlist) => {
          const firstVideoThumbNailObj = videos.find(
            (video) =>
              video.embedId ===
              (playlist.videos.length > 0 && playlist.videos[0].embedId)
          );

          const firstVideoThumbNail =
            firstVideoThumbNailObj && firstVideoThumbNailObj.thumbnailImgUrl;
          return (
            <Link
              className="card"
              to={"/playlist/" + playlist.id}
              key={playlist.id}
            >
              <div className="playlist-img-container">
                {playlist.videos.length > 0 ? (
                  <img
                    className="card-video-thumbnail"
                    src={firstVideoThumbNail}
                    loading="lazy"
                  />
                ) : (
                  <div className="empty-videos">
                    <span>Add Videos</span>
                  </div>
                )}
                <div className="playlist-overlay">
                  <RiPlayListAddFill />
                  <p>{playlist.videos.length} videos</p>
                </div>
              </div>
              <p className="card-title">{playlist.name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
