import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Footer from "../homepage/footer/Footer";
import "./dashboard.css";

const Dashboard = () => {
  const [cookies, setCookie] = useCookies(["jwt"]);

  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [user, setUser] = useState({});

  const url = `http://localhost:5000/user/${cookies.id}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        if (res.status == "200" && res.data.error == "success") {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updateUserProfile(event) {
    event.preventDefault();

    if (
      user.username &&
      user.email &&
      user.phone_number &&
      user.address &&
      user.password
    ) {
      axios
        .put("http://localhost:5000/user", {
          id: user.id,
          username: user.username,
          address: user.address,
          email: user.email,
          phone_number: user.phone_number,
          password: user.password,
          isAdmin: user.isAdmin,
        })
        .then((res) => {
          if (res.status == "200") {
            if (res.data.error == false) {
              setSuccess(true);
              setMessage(res.data.message);

              setTimeout(() => {
                setSuccess(false);
              }, 1500);
            }

            if (res.data.error == true) {
              setHasError(true);
              setMessage(res.data.message);

              setTimeout(() => {
                setHasError(false);
              }, 1500);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      {success && (
        <div className="alert__message success__message register__message">
          {message}
        </div>
      )}

      {hasError && (
        <div className="alert__message error__message field__message">
          {message}
        </div>
      )}

      <div className="user__profile__container">
        <div className="user__profile__content">
          <div className="profile__image__section">
            <img src="/profile.png" className="profile__image" />
          </div>
        </div>

        <div className="user__information__section">
          <form onSubmit={updateUserProfile}>
            <input
              type="text"
              className="user"
              value={user.username}
              onChange={(event) => {
                setUser({ ...user, username: event.target.value });
              }}
            />
            <input
              type={"email"}
              className="user"
              value={user.email}
              onChange={(event) => {
                setUser({ ...user, email: event.target.value });
              }}
            />
            <input
              type={"number"}
              className="user"
              value={user.phone_number}
              onChange={(event) => {
                setUser({ ...user, phone_number: event.target.value });
              }}
            />
            <input
              type={"text"}
              className="user"
              value={user.address}
              onChange={(event) => {
                setUser({ ...user, address: event.target.value });
              }}
            />
            <input
              type={"password"}
              className="user"
              placeholder="Enter you new password"
              onChange={(event) => {
                setUser({ ...user, password: event.target.value });
              }}
            />
            <div className="update__profile__content">
              <button className="btn primary-btn" type="submit">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
