import Navbar from "../components/homepage/navbar/Navbar";
import React, { useEffect, useState } from "react";
import Hero from "../components/store/hero/Hero";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Footer from "../components/homepage/footer/Footer";

const StorePage = () => {
  const [cookies, setCookies] = useCookies(["jwt"]);
  let navigate = useNavigate();

  function verifyUserFromCookie() {
    if (!cookies.jwt) {
      navigate("/login");
    }
  }

  useEffect(() => {
    verifyUserFromCookie();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
};

export default StorePage;
