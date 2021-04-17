import "./styles.css";
import VideoList from "./components/VideoList/VideoList";
import { videos } from "./data";

export default function App() {
  return (
    <div className="App">
      <h1>
        <span style={{ color: "red" }}>Dev</span> Stream
      </h1>
      <VideoList videos={videos} />
    </div>
  );
}
