import "./navigator.css";
import { NavLink } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import { AiOutlineLike, AiOutlineFieldTime } from "react-icons/ai";

export default function Navigator() {
  return (
    <aside className="navigator">
      <NavLink to="/" activeClassName="active-link" className="nav-item" end>
        <IoHomeSharp />
        <p className="nav-item-name">Home</p>
      </NavLink>
      <NavLink
        to="/playlist"
        activeClassName="active-link"
        className="nav-item"
      >
        <RiPlayListAddFill />
        <p className="nav-item-name">Playlist</p>
      </NavLink>
      <NavLink
        to="/watchlist"
        activeClassName="active-link"
        className="nav-item"
      >
        <AiOutlineFieldTime />
        <p className="nav-item-name">Watchlist</p>
      </NavLink>
      <NavLink to="/likes" activeClassName="active-link" className="nav-item">
        <AiOutlineLike />
        <p className="nav-item-name">Liked Videos</p>
      </NavLink>
    </aside>
  );
}
