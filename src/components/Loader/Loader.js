import "./loader.css";
import film from "../../assets/images/film.png";
import camera from "../../assets/images/camera.png";

export default function Loader() {
  return (
    <div>
      <div className="loader">
        <div className="loader__container">
          <div className="loader__film">
            <img className="loader__film-img" src={film} alt="" />
            <img className="loader__film-img" src={film} alt="" />
          </div>
          <img className="loader__camera" src={camera} alt="" />
        </div>
      </div>
      <h3 className="loader-text">Loading...</h3>
    </div>
  );
}
