import VideoList from "../VideoList/VideoList";
import { useUser } from "../../store/user/";

import "./history.css";

export default function History() {
  const { user } = useUser();

  return (
    <div className="history-container">
      <h2 className="section-heading">Recent Videos</h2>

      {user.history && <VideoList videos={user.history.reverse()} />}
    </div>
  );
}
