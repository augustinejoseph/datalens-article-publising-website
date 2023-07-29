import {
  RoundLoading,
  AuthContext,
  Navigate,
  useLocation,
  useState,
  useEffect,
  useContext,
} from "../../index";

const EmailVerifiedProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const is_active = user?.is_active;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (is_active) {
  } else {
  }

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

  if (is_active) {
    return children;
  } else {
    sessionStorage.setItem("originalLocation", location.pathname);
    return (
      <Navigate
        to={{
          pathname: "/verify-email",
        }}
      />
    );
  }
};

export default EmailVerifiedProtectedRoute;
