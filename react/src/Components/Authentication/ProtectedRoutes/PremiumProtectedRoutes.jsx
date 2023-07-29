import {
  RoundLoading,
  AuthContext,
  Navigate,
  useLocation,
  useState,
  useEffect,
  useContext,
} from "../../index";
const PremiumProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isPremium = user?.is_premium;

  useEffect(() => {
    // Simulating an asynchronous operation to fetch the user
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isPremium) {
    // Code to execute if user is an admin
  } else {
    // Code to execute if user is not an admin
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

  // Render the content based on user presence
  if (isPremium) {
    return children;
  } else {
    sessionStorage.setItem("originalLocation", location.pathname);
    // Navigate to login with the original location as the "from" state
    return (
      <Navigate
        to={{
          pathname: "/plans",
        }}
      />
    );
  }
};

export default PremiumProtectedRoute;
