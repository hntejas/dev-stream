import axios from "axios";
import { getAuthToken } from "../utils";

export async function createPlaylist(playlistName) {
  try {
    const response = await axios.post(
      "https://dev-stream-api.hntejas.repl.co/playlist",
      {
        name: playlistName,
      },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
  }
}

export async function addVideoToPlaylist(playlistId, videoId) {
  try {
    const response = await axios.post(
      "https://dev-stream-api.hntejas.repl.co/playlist/video",
      {
        playlistId,
        videoId,
      },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
  }
}

export async function removeVideoFromPlaylist(playlistId, videoId) {
  try {
    const response = await axios.post(
      "https://dev-stream-api.hntejas.repl.co/playlist/video/remove",
      {
        playlistId,
        videoId,
      },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
  }
}

export async function deletePlaylist(playlistId) {
  try {
    const response = await axios.delete(
      `https://dev-stream-api.hntejas.repl.co/playlist/${playlistId}`,
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
  }
}
