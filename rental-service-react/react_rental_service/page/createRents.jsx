import CreateRents from "../components/createRents/CreateRent";
import Navbar from "../components/homepage/navbar/Navbar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/homepage/footer/Footer";

const CreateRentsPage = () => {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

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
      <CreateRents />
      <Footer />
    </>
  );
};

export default CreateRentsPage;
