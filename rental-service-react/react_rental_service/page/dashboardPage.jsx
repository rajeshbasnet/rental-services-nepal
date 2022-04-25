import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Footer from "../components/homepage/footer/Footer";
import Navbar from "../components/homepage/navbar/Navbar";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt"]);

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
      <Dashboard />
      <Footer />
    </>
  );
};

export default DashboardPage;
