import { useRef, useContext } from "react";
import "./Login.css";
import { LoginCall } from "../../CallAPI";
import { CircularProgress } from "@material-ui/core";

import { AuthContext } from "../../context/AuthContext";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetch, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Flashsocial</h3>
          <span className="loginDesc">Welcome to my social!!!</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
              required
              minLength="6"
            />
            <button className="loginButton" type="submit" disabled={isFetch}>
              {isFetch ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton">
              {isFetch ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a  New  Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
