import React from "react";
import { Link } from "react-router-dom";
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner__container">
      <div className="banner__container__content"></div>
      <div className="overlay__banner__image"></div>
      <div className="banner_description">
        <h1>Hamro Bike Online Rental Services</h1>
        <h2>We provide best rent services for bikes for you</h2>
        <button className="btn primary-btn visit-btn">
          <Link to={"/store"}>Visit Store</Link>
        </button>
      </div>
    </div>
  );
};

export default Banner;
