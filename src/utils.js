import { toast } from "react-toastify";

export function convertToShortNumber(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + "K"
    : Math.abs(Number(labelValue));
}

export function showToast(text) {
  toast.dark(text, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    style: { background: "#181818", minHeight: "2rem" },
  });
}

export const addTokenToStorage = (token) => {
  localStorage.setItem(
    "devStreamAuth",
    JSON.stringify({ isLoggedIn: true, token: token })
  );
};

export const getAuthToken = () =>
  localStorage.getItem("devStreamAuth") &&
  JSON.parse(localStorage.getItem("devStreamAuth"))["token"];

export const isLoggedInLocally = () =>
  localStorage.getItem("devStreamAuth") &&
  JSON.parse(localStorage.getItem("devStreamAuth"))["isLoggedIn"];
