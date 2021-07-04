import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../../store/user";
import {
  removeVideoFromPlaylist,
  updatePlaylist as updatePlaylistName,
  deletePlaylist,
} from "../../../services/playlist.service";
import { showToast } from "../../../utils";
import VideoList from "../../VideoList/VideoList";

import { MdEdit, MdDelete } from "react-icons/md";

import "./playlist-videos.css";

export default function PlaylistVideos() {
  const { playlistId } = useParams();
  const { user, userDispatch, userActionTypes } = useUser();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  let playlist =
    user.playlists.find((playlist) => playlist.id == playlistId) || [];

  const [playlistName, setPlaylistName] = useState(playlist.name);

  const onRemoveHandler = async (e, video) => {
    e.preventDefault();
    const userConsent = confirm("Removing video from playlist, are you sure?");
    if (userConsent) {
      const response = await removeVideoFromPlaylist(playlistId, video.id);
      if (response.success) {
        userDispatch({
          type: userActionTypes.REMOVE_FROM_PLAYLIST,
          payload: {
            playlistId: playlistId,
            video: video,
          },
        });
      } else {
        if (response.status === 401) {
          userDispatch({
            type: userActionTypes.UPDATE_USER_LOGIN,
            payload: {
              isLoggedIn: false,
            },
          });
        }
      }
      showToast("Video removed");
    }
  };

  const toggleEditMode = () => {
    setPlaylistName(playlist.name);
    setEditMode((currentValue) => {
      return !currentValue;
    });
  };

  const updatePlaylist = async () => {
    const response = await updatePlaylistName(playlist.id, playlistName);
    if (response.success) {
      userDispatch({
        type: userActionTypes.UPDATE_PLAYLIST_NAME,
        payload: {
          playlistId: playlist.id,
          playlistName: playlistName,
        },
      });
      setEditMode(false);
    }
  };

  const removePlaylist = async () => {
    if (confirm("You are about to delete the playlist, are you sure?")) {
      const response = await deletePlaylist(playlist.id);
      if (response.success) {
        userDispatch({
          type: userActionTypes.REMOVE_PLAYLIST,
          payload: {
            playlistId: playlistId,
          },
        });
        navigate("/playlist");
      }
    }
  };

  return (
    <div className="playlist-videos">
      {editMode ? (
        <>
          <input
            className="playlist-input"
            value={playlistName}
            onChange={(e) => {
              setPlaylistName(e.target.value);
            }}
          />
          <button className="playlist-action-btn" onClick={updatePlaylist}>
            Save
          </button>
          <button className="playlist-action-btn" onClick={toggleEditMode}>
            Discard
          </button>
        </>
      ) : (
        <div className="playlist-header">
          <h2 className="section-heading">{playlist.name}</h2>
          <div className="playlist-action-container">
            <span onClick={toggleEditMode}>
              <MdEdit />
            </span>
            <span>
              <MdDelete onClick={removePlaylist} />
            </span>
          </div>
        </div>
      )}

      <VideoList
        videos={playlist.videos}
        onRemove={onRemoveHandler}
      ></VideoList>
    </div>
  );
}
