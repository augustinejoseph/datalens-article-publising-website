import {
  axios,
  useContext,
  useState,
  Link,
  AuthContext,
  BACKEND_BASE_URL,
  TokenRefresh,
  Navigate,
  useNavigate,
} from "../../index";

const VerifyEmail = (props) => {
  const { first_name, email } = props;

  const { user } = useContext(AuthContext);
  const userEmail = user?.email || email;
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailResend = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/user/resend-verification-mail`,
        { email: userEmail },
      );
    } catch (error) {
      navigate("/login");
    }
  };
  const handleTokenRefresh = async () => {
    await TokenRefresh();
    window.location.reload();
    navigate("/login");
  };
  return (
    <div className="login-container">
      <h1 className="login-heading">Verify Email</h1>
      <p className="login-paragraph">
        An Account has been created. Verify Email to proceed.
      </p>
      <span className="login-title">{first_name}</span>

      <span style={{ color: "grey" }} className="register-name-display">
        {email}
      </span>

      <div className="login-next-container">
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage} </div>
        )}

        <button onClick={handleEmailResend} className="login-next-button">
          Resend Email
        </button>

        <Link to="/login">
          <button onClick={handleTokenRefresh} className="login-next-button">
            Already Verified
          </button>
        </Link>
      </div>
      <div className="login-register-container"></div>
    </div>
  );
};
export default VerifyEmail;
