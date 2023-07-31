import {useNavigate, BACKEND_BASE_URL, useState, useContext,axios,AuthContext } from "../../index";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}/user/admin-login`,
        user,
      );

      const refreshTokenExpiration = 7;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + refreshTokenExpiration);
      Cookies.set("access_token", data.access_token);
      Cookies.set("refresh_token", data.refresh_token, {
        expires: expirationDate,
      });
      const tokenData = jwt_decode(data.access_token);

      const LoggedInUser = {
        email: tokenData.email,
        is_active: tokenData.is_active,
        is_banned: tokenData.is_banned,
        is_admin: tokenData.is_admin,
        name: "Admin",
      };
      setUser(LoggedInUser);
      navigate("/admin");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("An error occurred during authentication.");
      }
    }
  };

  return (
    <div>
      <div className="login-container">
        <h1 className="login-heading">Admin Sign in</h1>
        <p className="login-paragraph">Only admins can login here</p>
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
        <div style={{ margin: "10px" }}></div>
        <div className="login-email">
          <input
            className="login-email-input"
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-next-container">
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}{" "}
            </div>
          )}
          <button onClick={submit} className="login-next-button">
            Login
          </button>
        </div>
        <div className="login-register-container"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
