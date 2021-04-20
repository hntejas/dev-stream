import { useRef } from "react";
import * as userActionTypes from "../../../store/types/userActionTypes";

import "./playlist-form.css";

export default function PlaylistForm({
  user,
  userDispatch,
  currentVideo,
  onPlaylistModalClose,
}) {
  const handlePlaylistToggle = (playlistId, isVideoInPlaylist) => {
    userDispatch({
      type: isVideoInPlaylist
        ? userActionTypes.REMOVE_FROM_PLAYLIST
        : userActionTypes.ADD_TO_PLAYLIST,
      payload: {
        videoEmbedId: currentVideo,
        playlistId: playlistId,
      },
    });
  };

  const playListNameRef = useRef();

  const createPlaylistHandler = () => {
    const playlistName = playListNameRef.current.value;
    if (playlistName) {
      userDispatch({
        type: userActionTypes.CREATE_PLAYLIST,
        payload: {
          playlistName: playlistName,
        },
      });
      playListNameRef.current.value = "";
    }
  };

  return (
    <div className="playlist-form">
      <h3 className="section-heading">Your Playlists</h3>
      <span class="close" onClick={onPlaylistModalClose}>
        &times;
      </span>
      <ul className="playlist-list">
        {user.playlists.map((playlist) => {
          const isVideoPartOfPlaylist = playlist.videos.includes(currentVideo);
          return (
            <li key={playlist.id}>
              <label>
                <input
                  type="checkbox"
                  checked={isVideoPartOfPlaylist}
                  onChange={() =>
                    handlePlaylistToggle(playlist.id, isVideoPartOfPlaylist)
                  }
                ></input>
                {playlist.name}
              </label>
            </li>
          );
        })}
      </ul>
      <div>
        <input
          ref={playListNameRef}
          maxLength="30"
          type="text"
          placeholder="Create Playlist"
          className="input-playlist"
        />
        <span className="btn-playlist" onClick={createPlaylistHandler}>
          CREATE
        </span>
      </div>
    </div>
  );
}
