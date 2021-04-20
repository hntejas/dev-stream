import "./styles.css";
import { Routes, Route } from "react-router-dom";

import { UserContextProvider } from "./store/UserContext/UserContext";

import Header from "./components/Header/Header";
import VideoList from "./components/VideoList/VideoList";
import LikedVideoList from "./components/LikedVideoList/LikedVideoList";
import History from "./components/History/History";
import VideoPage from "./components/VideoPage/VideoPage";
import Navigator from "./components/Navigator/Navigator";
import { videos } from "./data";

export default function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Header />
        <Navigator />
        <div className="body-container">
          <Routes>
            <Route path="/" element={<VideoList videos={videos} />}></Route>
            <Route path="/video/:embedId" element={<VideoPage />}></Route>
            <Route path="/likes" element={<LikedVideoList />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </UserContextProvider>
    </div>
  );
}
