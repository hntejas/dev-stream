import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { UserContextProvider } from "./store/user/UserContext";

import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Header from "./components/Header/Header";
import VideoList from "./components/VideoList/VideoList";
import LikedVideoList from "./components/LikedVideoList/LikedVideoList";
import PlaylistPage from "./components/Playlist/PlaylistPage/PlaylistPage";
import PlaylistVideos from "./components/Playlist/PlaylistVideos/PlaylistVideos";
import History from "./components/History/History";
import VideoPage from "./components/VideoPage/VideoPage";
import Navigator from "./components/Navigator/Navigator";

import { useData } from "./store/DataContext/DataContext";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { videos } = useData();
  return (
    <div className="App">
      <ToastContainer />
      <UserContextProvider>
        <Header />
        <Navigator />
        <div className="body-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<VideoList videos={videos} />}></Route>
            <Route path="/video/:embedId" element={<VideoPage />}></Route>
            <Route path="/playlist" element={<PlaylistPage />} />
            <Route path="/playlist/:playlistId" element={<PlaylistVideos />} />
            <Route path="/likes" element={<LikedVideoList />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </UserContextProvider>
    </div>
  );
}
