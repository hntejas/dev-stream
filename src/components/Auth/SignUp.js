import { useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../store/user";
import { signup } from "../../services/auth.service";

import { showToast, addTokenToStorage } from "../../utils";
import "./auth.css";

export default function SignUp() {
  const validators = {
    name: (name) => {
      return name.length > 0;
    },
    email: (email) => {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    },
    password: (password) => {
      const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
      return password.length >= 8;
    },
    reconfirmPassword: (reconfirmPassword) => {
      return reconfirmPassword === userData.password.value;
    },
  };
  const initialUserData = {
    name: {
      value: "",
      isValid: false,
      errorMessage: "Please enter name",
    },
    email: {
      value: "",
      isValid: false,
      errorMessage: "Please enter valid email",
    },
    password: {
      value: "",
      isValid: false,
      errorMessage: "Password must be atleast 8 characters",
    },
    reconfirmPassword: {
      value: "",
      isValid: false,
      errorMessage: "Password does not match",
    },
  };

  const navigate = useNavigate();
  const { userDispatch, userActionTypes } = useUser();
  const [userData, setUserData] = useState(initialUserData);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) {
      setShowErrors(true);
    } else {
      const user = {
        name: userData.name.value,
        email: userData.email.value,
        password: userData.password.value,
      };

      setIsLoading(true);
      const response = await signup(user);
      if (response.success) {
        addTokenToStorage(response.token);
        userDispatch({
          type: userActionTypes.UPDATE_USER_LOGIN,
          payload: {
            isLoggedIn: true,
            name: userData.name.value,
          },
        });
        navigate("/");
      } else {
        showToast(
          <p>Signup Failed!! {response.error && response.error.message}</p>
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
        <h3>Signup</h3>
        <label>Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter Name"
          value={userData.name.value}
          onChange={onChangeHandler}
        />
        <p
          className="error-input"
          style={{
            display: !userData.name.isValid && showErrors ? "block" : "none",
          }}
        >
          {userData.name.errorMessage}
        </p>
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
          value={userData.password.value}
          placeholder="Enter Password"
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
        <label>Confirm Password</label>
        <input
          id="reconfirmPassword"
          type="password"
          value={userData.reconfirmPassword.value}
          placeholder="Re-Enter Password"
          onChange={onChangeHandler}
        />
        <p
          className="error-input"
          style={{
            display:
              !userData.reconfirmPassword.isValid && showErrors
                ? "block"
                : "none",
          }}
        >
          {userData.reconfirmPassword.errorMessage}
        </p>
        <button type="submit" className="auth-btn">
          {isLoading ? "Signing in..." : "Signup"}
        </button>
        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
