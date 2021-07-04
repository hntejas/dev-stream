import { Route, Navigate } from "react-router-dom";
import { useUser } from "./store/user";

export default function PrivateRoute({ path, ...props }) {
  const { user } = useUser();
  return user.isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} to="/login" replace />
  );
}
