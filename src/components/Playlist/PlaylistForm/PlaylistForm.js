import { useRef } from "react";
import { useUser } from "../../../store/user";
import {
  createPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../../../services/playlist.service";

import "./playlist-form.css";
import { showToast } from "../../../utils";

export default function PlaylistForm({ currentVideo, onPlaylistModalClose }) {
  const { user, userDispatch, userActionTypes } = useUser();

  const handlePlaylistToggle = async (playlistId, isVideoInPlaylist) => {
    const response = isVideoInPlaylist
      ? await removeVideoFromPlaylist(playlistId, currentVideo.id)
      : await addVideoToPlaylist(playlistId, currentVideo.id);
    if (response.success) {
      userDispatch({
        type: isVideoInPlaylist
          ? userActionTypes.REMOVE_FROM_PLAYLIST
          : userActionTypes.ADD_TO_PLAYLIST,
        payload: {
          video: currentVideo,
          playlistId: playlistId,
        },
      });
    } else {
      if (response.response.status === 401) {
        userDispatch({
          type: userActionTypes.UPDATE_USER_LOGIN,
          payload: {
            isLoggedIn: false,
          },
        });
      }
    }
  };

  const playListNameRef = useRef();

  const createPlaylistHandler = async () => {
    const playlistName = playListNameRef.current.value;
    if (playlistName) {
      const response = await createPlaylist(playlistName);
      if (response.success) {
        userDispatch({
          type: userActionTypes.CREATE_PLAYLIST,
          payload: {
            playlistName: response.playlist.name,
            playlistId: response.playlist.id,
          },
        });
      } else {
        if (response.response.status === 401) {
          userDispatch({
            type: userActionTypes.UPDATE_USER_LOGIN,
            payload: {
              isLoggedIn: false,
            },
          });
        }
        showToast(<p>Ops! Something went wrong, please try again</p>);
      }

      playListNameRef.current.value = "";
    }
  };

  return (
    <div className="playlist-form">
      <h3 className="section-heading">Your Playlists</h3>
      <span className="close" onClick={onPlaylistModalClose}>
        &times;
      </span>

      <ul className="playlist-list">
        {!user.playlists.length > 0 && (
          <>
            <p>No playlists!</p>
          </>
        )}
        {user.playlists.map((playlist) => {
          const isVideoPartOfPlaylist = playlist.videos.find(
            (playlistVideo) => playlistVideo.embedId === currentVideo.embedId
          );
          return (
            <li key={playlist.id}>
              <label>
                <input
                  type="checkbox"
                  checked={isVideoPartOfPlaylist}
                  onChange={() =>
                    handlePlaylistToggle(playlist.id, isVideoPartOfPlaylist)
                  }
                />
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
