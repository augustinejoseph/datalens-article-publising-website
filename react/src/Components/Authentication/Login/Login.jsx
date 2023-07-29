import { useContext } from "react";
import jwt_decode from "jwt-decode";
import "./Login.css";
import {
  useState,
  AuthContext,
  React,
  fullLogo,
  useToast,
  Cookies,
  axios,
  Link,
  Navigate,
  useNavigate,
  BACKEND_BASE_URL,
} from "../../index";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const originalLocation = sessionStorage.getItem("originalLocation");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  // Email check
  const handleEmailCheck = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      setErrorMessage("");
      const response = await axios.post(
        `${BACKEND_BASE_URL}/user/email-check`,
        {
          email: email,
        },
      );
      setLoading(false);

      if (response.data.status == true) {
        setLoading(false);
        setEmailChecked(true);
        setName(response.data.user.first_name);
      } else {
        setLoading(false);
        showToast("Invalid email Id", 404);
        setEmailChecked(false);
      }
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.status) {
        showToast("Internal Server Error", error.response.status);
      } else {
        showToast("Internal Server Error");
      }
    }
  };

  // Login Function
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      setLoading(true);
      const { data } = await axios.post(`${BACKEND_BASE_URL}/user/login`, user);

      // Storing Access in cookie
      const refreshTokenExpiration = 7; // 7 days
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + refreshTokenExpiration);

      Cookies.set("access_token", data.access_token);
      Cookies.set("refresh_token", data.refresh_token, {
        expires: expirationDate,
      });
      const tokenData = jwt_decode(data.access_token);

      const LoggedInUser = {
        user_name: tokenData.user_name,
        name: tokenData.name,
        email: tokenData.email,
        is_active: tokenData.is_active,
        is_banned: tokenData.is_banned,
        is_admin: tokenData.is_admin,
        user_id: tokenData.user_id,
        is_premium: tokenData.is_premium,
      };

      setUser(LoggedInUser);
      setLoading(false);
      showToast("Logged in successfully", data.status);
      if (!LoggedInUser.is_active) {
        navigate("/verify-email");
      } else {
        setLoading(false);
        if (originalLocation) {
          sessionStorage.removeItem("originalLocation");
          return <Navigate to={originalLocation} replace />;
        } else {
          return <Navigate to="/" replace />;
        }
      }
      navigate("/");
    } catch (error) {
      if (error.response || error.response) {
        setLoading(false);
        showToast("Wrong  Password");
        setErrorMessage("Wrong password");
      } else {
        setLoading(false);
        setErrorMessage("An error occurred during authentication.");
      }
    }
  };

  return emailChecked ? (
    <>
      <div className="login-container">
        <h1 className="login-heading">Password</h1>
        <p className="login-paragraph">Enter the password</p>
        <span className="login-title">{name}</span>
        <div className="login-email">
          <input
            className="login-email-input"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="login-email-underline">
          __________________________________
        </span>
        <div className="login-next-container">
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}{" "}
            </div>
          )}
          <button onClick={submit} className="login-next-button">
            {loading ? null : "Login"}
            {loading && (
              <svg className="loadingmodal_svg_login" viewBox="25 25 50 50">
                <circle
                  className="loadingmodal_circle_login"
                  r="20"
                  cy="50"
                  cx="50"
                ></circle>
              </svg>
            )}
          </button>
        </div>
        <div className="login-register-container">
          <Link className="login-register-button" to="/register">
            Register
          </Link>
          <Link className="login-home-button" to="/">
            Home
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="login-container">
        <h1 className="login-heading">Sign in with email</h1>
        <p className="login-paragraph">
          Enter the email address associated with your account.
        </p>
        <span className="login-title">Your Email</span>
        <div className="login-email">
          <input
            className="login-email-input"
            type="email"
            placeholder="Enter email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <span className="login-email-underline">
          __________________________________
        </span>
        <div className="login-next-container">
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}{" "}
            </div>
          )}
          <div className="login-next-button-container">
            <button onClick={handleEmailCheck} className="login-next-button">
              {loading ? null : "Continue"}
              {loading && (
                <svg className="loadingmodal_svg_login" viewBox="25 25 50 50">
                  <circle
                    className="loadingmodal_circle_login"
                    r="20"
                    cy="50"
                    cx="50"
                  ></circle>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="login-register-container">
          <Link className="login-register-button" to="/register">
            Register
          </Link>
          <Link className="login-home-button" to="/">
            Home
          </Link>
        </div>
      </div>
    </>
  );
};
export default Login;
