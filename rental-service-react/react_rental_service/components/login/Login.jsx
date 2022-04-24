import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [cookies, setCookie] = useCookies(["jwt"]);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  function checkLoginUser(event) {
    event.preventDefault();

    if (user.email && user.password) {
      axios
        .post("http://localhost:5000/login", {
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          if (res.status == "200") {
            if (res.data.error == "error") {
              setHasError(true);
              setMessage(res.data.message);

              setTimeout(() => {
                setHasError(false);
              }, 2000);
            }
          }

          if (res.data.error == "not found") {
            setHasError(true);
            setMessage(res.data.message);

            setTimeout(() => {
              setHasError(false);
            }, 2000);
          }

          if (res.data.error == "success") {
            setIsLoggedIn(true);
            setMessage(res.data.message);

            setCookie("jwt", res.data.token, {
              path: "/",
            });

            setCookie("isAdmin", res.data.isAdmin, {
              path: "/",
            });

            setCookie("id", res.data.id, {
              path: "/",
            });

            setTimeout(() => {
              setIsLoggedIn(false);
              setShouldRedirect(true);
            }, 2000);
          }
        });
    } else {
      setHasError(true);
      setMessage("Please, all fields mandatory !");

      setTimeout(() => {
        setHasError(false);
      }, 2000);
    }
  }

  return (
    <>
      {shouldRedirect && <Navigate replace to="/" />}

      {isLoggedIn && (
        <div className="alert__message success__message register__message">
          {message}. Redirecting....
        </div>
      )}

      {hasError && (
        <div className="alert__message error__message field__message">
          {message}
        </div>
      )}
      <div className="login__container">
        <div className="cont">
          <div className="form">
            <form onSubmit={checkLoginUser}>
              <h1>Login</h1>
              <input
                type="text"
                className="user"
                placeholder="Enter you mail"
                value={user.email}
                onChange={(event) => {
                  setUser({ ...user, email: event.target.value });
                }}
              />
              <input
                type="password"
                className="pass"
                placeholder="Enter your password"
                value={user.password}
                onChange={(event) => {
                  setUser({ ...user, password: event.target.value });
                }}
              />
              <button type="submit" className="login">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
