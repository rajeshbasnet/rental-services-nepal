import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      removeCookie("jwt");
      removeCookie("isAdmin");
      removeCookie("id");
      navigate("/login");
    }

    navigate("/login");
  }, []);

  return <></>;
};

export default LogoutPage;
