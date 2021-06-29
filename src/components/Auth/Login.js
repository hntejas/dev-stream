import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useUser } from "../../store/user";
import { showToast, addTokenToStorage } from "../../utils";
import { login } from "../../services/auth.service";
import "./auth.css";

export default function Login() {
  const validators = {
    email: (email) => {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    },
    password: (password) => {
      return password && password.length > 0;
    },
  };
  const initialUserData = {
    email: {
      value: "",
      isValid: false,
      errorMessage: "Enter valid email",
    },
    password: {
      value: "",
      isValid: false,
      errorMessage: "Enter valid password",
    },
  };

  let from = "";
  const { userDispatch, userActionTypes } = useUser();
  const [userData, setUserData] = useState(initialUserData);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  from = state?.from;

  const onSubmit = async (e) => {
    e.preventDefault();

    const isEmailvalid = validateForm();
    if (!isEmailvalid) {
      setShowErrors(true);
    } else {
      setIsLoading(true);
      const response = await login({
        email: userData.email.value,
        password: userData.password.value,
      });
      if (response.success) {
        addTokenToStorage(response.token);
        userDispatch({
          type: userActionTypes.UPDATE_USER_LOGIN,
          payload: {
            isLoggedIn: true,
            name: response.name,
          },
        });
        navigate(from || "/");
      } else {
        showToast(
          <p>Login failed! {response.error && response.error.message}</p>
        );
      }
      setIsLoading(false);
    }
  };

  const onChangeHandler = (e) => {
    showErrors && setShowErrors(false);
    const currentTarget = e.currentTarget;
    const id = e.currentTarget.id;
    setUserData(function (state) {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy[id].isValid = validateField(id, currentTarget.value);
      stateCopy[id].value = currentTarget.value;
      return stateCopy;
    });
  };

  const validateField = (field, value) => {
    return validators[field](value);
  };

  const validateForm = () => {
    const isFormValid = true;
    for (let field in userData) {
      if (!userData[field].isValid) {
        return false;
      }
    }
    return isFormValid;
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h3>Login</h3>
        <label>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={userData.email.value}
          onChange={onChangeHandler}
        />
        <p
          className="error-input"
          style={{
            display: !userData.email.isValid && showErrors ? "block" : "none",
          }}
        >
          {userData.email.errorMessage}
        </p>
        <label>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={userData.password.value}
          onChange={onChangeHandler}
        />
        <p
          className="error-input"
          style={{
            display:
              !userData.password.isValid && showErrors ? "block" : "none",
          }}
        >
          {userData.password.errorMessage}
        </p>
        <button type="submit" className="auth-btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "login"}
        </button>
        <p>
          Not a user?{" "}
          <Link state={{ from: from }} replace to={"/signup?from=" + from}>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
