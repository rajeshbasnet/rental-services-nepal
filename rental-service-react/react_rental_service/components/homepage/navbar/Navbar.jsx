import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function verifyUserFromCookie() {
    if (cookies.jwt) {
      setLoggedIn(true);
    }

    if (cookies.isAdmin == "true") {
      setIsAdmin(true);
    }
  }

  useEffect(() => {
    verifyUserFromCookie();
  }, []);

  if (loggedIn) {
    return (
      <React.Fragment>
        <nav>
          <div className="container0">
            <div id="i" className="inav">
              <div className="c1"></div>
              <div className="c2"></div>
              <div className="c3"></div>
            </div>
          </div>

          <ul id="nav" className="nav">
            <Link to={"/"}>HOME</Link>
            <Link to={"/store"}>STORE</Link>
            {isAdmin && <Link to={"/rents"}>ADD SERVICES</Link>}
            {isAdmin && <Link to={"/addbikes"}>ADD BIKES</Link>}
            <Link to={"/dashboard"}>DASHBOARD</Link>
            <Link to={"/logout"}>LOGOUT</Link>
          </ul>
        </nav>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <nav>
          <div className="container0">
            <div id="i" className="inav">
              <div className="c1"></div>
              <div className="c2"></div>
              <div className="c3"></div>
            </div>
          </div>

          <ul id="nav" className="nav">
            <Link to={"/"}>HOME</Link>
            <Link to={"/store"}>STORE</Link>
            <Link to={"/login"}>LOGIN</Link>
            <Link to={"/register"}>REGISTER</Link>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
};

export default Navbar;
