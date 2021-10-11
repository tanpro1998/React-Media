import { useRef } from "react";
import "./Register.css";
import { useHistory } from "react-router";
import axios from "axios";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
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
              ref={username}
              required
              placeholder="Username"
              className="loginInput"
            />
            <input
              ref={email}
              required
              placeholder="Email"
              className="loginInput"
              type="email"
            />
            <input
              ref={password}
              required
              placeholder="Password"
              className="loginInput"
              type="password"
              min="6"
            />
            <input
              ref={passwordAgain}
              required
              placeholder="Confirm Password"
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton">Login into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
