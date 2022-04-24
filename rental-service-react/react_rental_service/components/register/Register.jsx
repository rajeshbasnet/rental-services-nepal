import { useState } from "react";
import Navbar from "../homepage/navbar/Navbar";
import "./register.css";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    address: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [message, setMessage] = useState("");

  function registerUser(event) {
    event.preventDefault();

    if (
      user.username &&
      user.address &&
      user.email &&
      user.phone_number &&
      user.password
    ) {
      axios
        .post("http://localhost:5000/user", {
          username: user.username,
          address: user.address,
          email: user.email,
          phone_number: user.phone_number,
          password: user.password.trim(),
        })
        .then((response) => {
          if (response.status == "201" && response.data.error == "success") {
            setIsRegistered(true);
            setMessage(response.data.message);

            setTimeout(() => {
              setIsRegistered(false);
            }, 2000);
          }

          if (response.status == "200" && response.data.error == "warning") {
            setHasError(true);
            setMessage(response.data.message);

            setTimeout(() => {
              setHasError(false);
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setHasError(true);
      setMessage("All field should contain data !");

      setTimeout(() => {
        setHasError(false);
        setMessage("");
      }, 2000);
    }
  }

  return (
    <>
      <Navbar />
      {isRegistered && (
        <div className="alert__message success__message register__message">
          {message}
        </div>
      )}

      {hasError && (
        <div className="alert__message error__message field__message">
          {message}
        </div>
      )}

      <div className="register__container">
        <div className="cont">
          <div className="form">
            <form method="post" onSubmit={registerUser}>
              <h1>Register</h1>
              <input
                type="text"
                className="user"
                placeholder="Enter your username"
                value={user.username}
                onChange={(event) => {
                  setUser({ ...user, username: event.target.value });
                }}
              />
              <input
                type={"email"}
                className="pass"
                placeholder="Enter your email"
                value={user.email}
                onChange={(event) => {
                  setUser({ ...user, email: event.target.value });
                }}
              />
              <input
                type="text"
                className="user"
                placeholder="Enter your address"
                value={user.address}
                onChange={(event) => {
                  setUser({ ...user, address: event.target.value });
                }}
              />
              <input
                type={"number"}
                className="user"
                placeholder="Enter your phone number"
                value={user.phone_number}
                onChange={(event) => {
                  setUser({ ...user, phone_number: event.target.value });
                }}
              />
              <input
                type={"password"}
                className={"user"}
                placeholder="Enter your password"
                value={user.password}
                onChange={(event) => {
                  setUser({ ...user, password: event.target.value });
                }}
              />
              <button type="submit" className="login">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
