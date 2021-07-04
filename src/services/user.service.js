import axios from "axios";
import { getAuthToken } from "../utils";

export async function getUserData() {
  try {
    const response = await axios.get(
      "https://dev-stream-api.hntejas.repl.co/user",
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
        return {
          ...serverError.response.data,
          status: serverError.response.status,
        };
      }
    }
  }
}

export async function likeVideo(videoId) {
  try {
    const response = await axios.post(
      "https://dev-stream-api.hntejas.repl.co/user/like",
      {
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
        return {
          ...serverError.response.data,
          status: serverError.response.status,
        };
      }
    }
  }
}

export async function unlikeVideo(videoId) {
  try {
    const response = await axios.post(
      "https://dev-stream-api.hntejas.repl.co/user/unlike",
      {
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
        return {
          ...serverError.response.data,
          status: serverError.response.status,
        };
      }
    }
  }
}

export async function updateHistory(videoId) {
  try {
    const response = await axios.post(
      "https://dev-stream-api.hntejas.repl.co/user/history",
      {
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
        return {
          ...serverError.response.data,
          status: serverError.response.status,
        };
      }
    }
  }
}
