import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiThumbUpFill, RiPlayListAddFill } from "react-icons/ri";
import { IoIosShareAlt } from "react-icons/io";

import VideoCard from "../VideoCard/VideoCard";
import Modal from "../Modal/Modal";
import PlaylistForm from "../Playlist/PlaylistForm/PlaylistForm";
import { UserContext } from "../../store/UserContext/UserContext";

import * as userActionTypes from "../../store/types/userActionTypes";
import { showToast, convertToShortNumber } from "../../utils";
import { videos } from "../../data";

import "./video-page.css";

export default function VideoPage() {
  const { user, userDispatch } = useContext(UserContext);

  const { embedId } = useParams();

  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const togglePlaylistModal = () => {
    setIsPlaylistModalOpen(!isPlaylistModalOpen);
  };

  const copyUrlHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied to clipboard!");
  };

  useEffect(() => {
    userDispatch({
      type: userActionTypes.UPDATE_HISTORY,
      payload: {
        videoEmbedId: embedId,
      },
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [embedId]);

  const { title, views, age, channel, likes } = videos.find(
    (video) => video.embedId === embedId
  );

  const isVideoLiked = user.likedVideos.includes(embedId);

  const videoLikeHandler = () => {
    userDispatch({
      type: userActionTypes.TOGGLE_LIKED_VIDEO,
      payload: {
        videoEmbedId: embedId,
        isVideoAlreadyLiked: isVideoLiked,
      },
    });
  };

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
          <div className="video-actions">
            <div
              className="video-action-item"
              onClick={videoLikeHandler}
              style={{ color: isVideoLiked ? "#3EA6FF" : "white" }}
            >
              <RiThumbUpFill />{" "}
              <span>
                {convertToShortNumber(isVideoLiked ? likes + 1 : likes)}
              </span>
            </div>
            <div className="video-action-item" onClick={copyUrlHandler}>
              <IoIosShareAlt /> <span>SHARE</span>
            </div>
            <div className="video-action-item" onClick={togglePlaylistModal}>
              <RiPlayListAddFill /> <span>SAVE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="video-page-suggestion">
        <h3 className="video-suggestion-heading">Next Videos</h3>
        {videos.map((video) => {
          if (video.embedId === embedId) {
            return null;
          }
          return <VideoCard video={video} key={video.id} />;
        })}
      </div>
      <Modal isOpen={isPlaylistModalOpen} closeModal={togglePlaylistModal}>
        <PlaylistForm
          user={user}
          userDispatch={userDispatch}
          currentVideo={embedId}
          onPlaylistModalClose={togglePlaylistModal}
        />
      </Modal>
    </div>
  );
}
