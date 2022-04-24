import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Banner from "../components/homepage/banner/banner";
import Footer from "../components/homepage/footer/Footer";
import Navbar from "../components/homepage/navbar/Navbar";

function Homepage() {
  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Banner />
      <Footer />
    </div>
  );
}

export default Homepage;
