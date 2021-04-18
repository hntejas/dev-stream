import "./styles.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header"
import VideoList from "./components/VideoList/VideoList";
import VideoPage from "./components/VideoPage/VideoPage"
import { videos } from "./data";

export default function App() {
  return (
    <div className="App">      
      <Header />

      <div className="body-container">
        <Routes>
          <Route path="/" element={<VideoList videos={videos}/>}></Route>
          <Route path="/video/:embedId" element={<VideoPage/>}></Route>
        </Routes>
      </div>
    </div>
  );
}
