import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../../store/UserContext/UserContext";
import { videos } from "../../../data";
import { RiPlayListAddFill } from "react-icons/ri";

import "./playlist-page.css";

export default function PlaylistPage() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2 className="section-heading">Playlist</h2>

      <div className="playlist-container">
        {user.playlists.map((playlist) => {
          const firstVideoThumbNailObj = videos.find(
            (video) => video.embedId === playlist.videos[0]
          );

          const firstVideoThumbNail =
            firstVideoThumbNailObj && firstVideoThumbNailObj.thumbnailImgUrl;
          return (
            <Link className="card" to={"/playlist/" + playlist.id}>
              {playlist.videos.length > 0 ? (
                <img
                  className="card-video-thumbnail"
                  src={firstVideoThumbNail}
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
              <p className="card-title">{playlist.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
