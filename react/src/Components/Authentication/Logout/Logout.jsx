import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../../../Contexts/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      setUser(null);

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <span
      onClick={handleLogout}
      style={{
        border: "none",
        padding: "0",
        background: "none",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      Logout
    </span>
  );
};

export default Logout;
