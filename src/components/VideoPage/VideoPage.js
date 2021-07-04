import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiThumbUpFill, RiPlayListAddFill } from "react-icons/ri";
import { IoIosShareAlt } from "react-icons/io";

import VideoCard from "../VideoCard/VideoCard";
import Modal from "../Modal/Modal";
import AuthPromptModal from "../Auth/AuthPromptModal";
import PlaylistForm from "../Playlist/PlaylistForm/PlaylistForm";
import { useUser } from "../../store/user";
import { useData } from "../../store/data";
import {
  likeVideo,
  unlikeVideo,
  updateHistory,
} from "../../services/user.service";

import { showToast, convertToShortNumber } from "../../utils";

import "./video-page.css";

export default function VideoPage() {
  const { user, userDispatch, userActionTypes } = useUser();
  const { videos } = useData();

  const { embedId } = useParams();

  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const togglePlaylistModal = () => {
    user.isLoggedIn
      ? setIsPlaylistModalOpen(!isPlaylistModalOpen)
      : setShowAuthPrompt(true);
  };

  const copyUrlHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied to clipboard!");
  };

  useEffect(async () => {
    if (videos.length > 0 && user.isLoggedIn) {
      const currentVideo =
        videos && videos.find((video) => video.embedId === embedId);
      const response = await updateHistory(currentVideo.id);
      if (response.success) {
        userDispatch({
          type: userActionTypes.UPDATE_HISTORY,
          payload: {
            video: currentVideo,
          },
        });
      }
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [embedId, videos]);

  if (!videos || (videos && videos.length <= 0)) {
    return <h3></h3>;
  }

  const currentVideo =
    videos && videos.find((video) => video.embedId === embedId);
  const { title, views, age, channel, likes } = currentVideo;

  const isVideoLiked = !!user.likedVideos.find((video) => {
    return video.embedId === embedId;
  });

  const videoLikeHandler = async () => {
    if (!user.isLoggedIn) {
      setShowAuthPrompt(true);
      return;
    }
    const promise = isVideoLiked
      ? unlikeVideo(currentVideo.id)
      : likeVideo(currentVideo.id);
    userDispatch({
      type: userActionTypes.TOGGLE_LIKED_VIDEO,
      payload: {
        video: currentVideo,
        isVideoAlreadyLiked: isVideoLiked,
      },
    });

    const response = await promise;
    if (!response.success) {
      userDispatch({
        type: userActionTypes.TOGGLE_LIKED_VIDEO,
        payload: {
          video: currentVideo,
          isVideoAlreadyLiked: isVideoLiked,
        },
      });
    }
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
          <img src={channel.logo} className="channel-logo" loading="lazy" />
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
      <AuthPromptModal
        isOpen={showAuthPrompt}
        closeModal={() => {
          setShowAuthPrompt(false);
        }}
      />
      <Modal isOpen={isPlaylistModalOpen} closeModal={togglePlaylistModal}>
        <PlaylistForm
          currentVideo={currentVideo}
          onPlaylistModalClose={togglePlaylistModal}
        />
      </Modal>
    </div>
  );
}
