import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../../Contexts/AuthContext";
import RoundLoading from "../../Shimmers/RoundLoading";

const UserProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <RoundLoading />
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  } else {
    sessionStorage.setItem("originalLocation", location.pathname);
    return (
      <Navigate
        to={{
          pathname: "/login",
        }}
      />
    );
  }
};

export default UserProtectedRoute;
