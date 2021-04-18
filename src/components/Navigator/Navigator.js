import "./navigator.css"
import {IoHomeSharp} from "react-icons/io5"
import {RiPlayListAddFill} from "react-icons/ri"
import {AiOutlineLike, AiOutlineFieldTime} from "react-icons/ai"

export default function Navigator(){
    return <aside className="navigator">
        <div className="nav-item">
            <IoHomeSharp />
            <p className="nav-item-name">Home</p>
        </div>
        <div className="nav-item">
            <RiPlayListAddFill />
            <p className="nav-item-name">Playlist</p>
        </div>
        <div className="nav-item">
            <AiOutlineFieldTime />
            <p className="nav-item-name">Watchlist</p>
        </div>
        <div className="nav-item">
            <AiOutlineLike />
            <p className="nav-item-name">Liked Videos</p>
        </div>
    </aside>
}