import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import "./header.css";
import { useUser } from "../../store/user";

export default function Header() {
  const { user, userDispatch, userActionTypes } = useUser();

  const logoutUser = () => {
    userDispatch({
      type: userActionTypes.UPDATE_USER_LOGIN,
      payload: {
        isLoggedIn: false,
      },
    });
  };

  return (
    <div className="header">
      <Link className="header-logo" to="/">
        <span style={{ color: "red" }}>Dev</span> Stream
      </Link>

      {user.isLoggedIn ? (
        <div className="header-auth" onClick={logoutUser}>
          <BiLogIn /> Logout
        </div>
      ) : (
        <Link className="header-auth" to="/login">
          <BiLogIn /> Login
        </Link>
      )}
    </div>
  );
}
