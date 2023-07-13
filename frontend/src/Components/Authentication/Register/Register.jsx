
import "./Register.css";
import ReCAPTCHA from "react-google-recaptcha"
import {Flag,dotenv, VerifyEmail, BACKEND_BASE_URL, Link, useNavigate,axios,useState , useRef, fullLogo, useToast} from '../../index'

const Register = () => {
  const showToast = useToast()
  const [email, setEmail] = useState("");
  const [emailStepCompleted, setEmailStepCompleted] = useState(false);
  const [isPasswordStepCompleted, setIsPasswordStepCompleted] = useState(false);
  const [isUserDetailsStepCompleted, setIsUserDetailsStepCompleted] = useState(false);
  const [isInterestStepsCompleted, setIsInterestStepsCompleted] = useState(false);
  const [isEmailVerifCompleted, setisEmailVerifCompleted] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isCaptchaSuccess, setIsCaptchaSuccess] = useState(false)
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState({});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [allIntersetFromAPI, setAllIntersetFromAPI] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const GOOGLE_CAPTCHA_SITE_KEY = import.meta.env.VITE_GOOGLE_CAPTCHA_SITE_KEY
  const captchaRef = useRef(null)

  const getAllInterestsListFromServer = async () => {
    const response = await axios.get(
      `${BACKEND_BASE_URL}user/all-interests`,
      
    );
    setAllIntersetFromAPI(response.data);
  };

  // Email page
  const handleEmailCheck = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Enter a valid email id");
      return;
    }
  
    const validDomains = ["gmail.com", "yahoo.com", "hotmail.com", "nasskar.com", "dronetz.com", "edulena.com"];
  
    const domain = email.split("@")[1];
    if (!validDomains.includes(domain)) {
      setErrorMessage("Enter a valid email domain");
      return;
    }
  
  
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}user/email-availability`,
        { email: email }
      );
      console.log(response.data);
      if (response.data === true) {
        setEmailStepCompleted(true);
      } else {
        setErrorMessage("Account already exists.");
      }
    } catch (error) {
      console.log(error);
      showToast("Internal Server Error");
    }
  };

  // Password Check
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValid = validatePassword(newPassword);
    setIsPasswordValid(isValid);
    if (isValid) {
      isPasswordValid(true);
    } else {
      isPasswordValid(false);
    }
  };
  const validatePassword = (password) => {
    if (password.length < 8) {
      setErrorMessage("Minimum length is 8");
      return false;
    } else {
      const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
      if (!specialChars.test(password)) {
        setErrorMessage("Password must contain at least one special character");
        return false;
      } else {
        setErrorMessage("");
        return true;
      }
    }
  };
  const handlePasswordSubmission = () => {
    if (isPasswordValid) {
      setIsPasswordStepCompleted(true);
    }
  };

  // User Details
  const handleUserData = () => {
    if (first_name.length === 0) {
      setErrorMessage("Enter a FirstName");
      setIsUserDetailsStepCompleted(false);
    } else if (last_name.length === 0) {
      setErrorMessage("Enter a Last Name");
      setIsUserDetailsStepCompleted(false);
    } else {
      setIsUserDetailsStepCompleted(true);
      getAllInterestsListFromServer();
    }
  };

  // Interest Selection
  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Captcha submission
  const handleCaptchaChange = () => {
    const captchaValue = captchaRef.current.getValue();

  if (captchaValue) {
    setIsCaptchaSuccess(true)
  }else{
    setErrorMsg("Captcha verification Failed")
  }
}

  // submit final data to DB
  const submit = async (e) => {
  e.preventDefault();
      const user = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      interests: selectedInterests,
    };
    try {
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}user/register`,
        user
      );
      if (data.success) {
        console.log("success msg form final summit", data.success);
        setSuccessMsg(data.message);
        showToast(data.message, data.status)
        setIsUserDetailsStepCompleted(true);
        navigate("/verify-email");
        console.log("data from registere", data);
      } else {
        showToast(data.error, 500)
        console.log("error from data after final submit", data.error);
        setErrorMsg(data.errors);
      }
    } catch (error) {
      showToast("Internal server error", 500)
      console.error("Error: ", error);
      setErrorMsg({ general: "An error occurred. Please try again." });
    }
  
  };
  
  return (
    <>
      


      {/* Email Step 1 */}
      {!emailStepCompleted && (
        <div className="login-container">
          <img onClick={() => navigate("/")} className="login_logo" src={fullLogo} />
          <h1 className="login-heading">Sign up with email</h1>
          <p className="login-paragraph">
            Enter the email address to create an account.
          </p>
          <span className="login-title">Your Email</span>
          <div className="login-email">
            <input
              className="login-email-input"
              type="email"
              placeholder="Enter a valid email id"
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
            <button onClick={handleEmailCheck} className="login-next-button">
              Continue
            </button>
          </div>
          <div className="login-register-container">
            <Link className="login-register-button" to="/login">
              Login
            </Link>
            <Link className="login-home-button" to="/">
              Home
            </Link>
          </div>
        </div>
      )}

      {/* Password Step 2 */}
      {emailStepCompleted && !isPasswordStepCompleted && (
        <div className="login-container">
          <h1 className="login-heading">Set a Password</h1>
          <p className="login-paragraph">Enter a strong Password at least 8 letters and one special character.</p>
          <span className="login-title">{email}</span>
          <div className="login-email">
            <input
              className="login-email-input"
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={handlePasswordChange}
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
            <button
              disabled={!isPasswordValid}
              onClick={handlePasswordSubmission}
              className={`login-next-button ${!isPasswordValid ? 'disabled-button' : ''}`}
            >
              User Details
            </button>
          </div>
          <div className="login-register-container">
            <Link className="login-register-button" to="/login">
              Login
            </Link>
            <Link className="login-home-button" to="/">
              Home
            </Link>
          </div>
        </div>
      )}

      {/* User Details Step 3 */}
      {emailStepCompleted &&
        isPasswordStepCompleted &&
        !isUserDetailsStepCompleted && !isEmailVerifCompleted && (
          <div className="login-container">
            <h1 className="login-heading">User Details</h1>
            <p className="login-paragraph">
              Enter your first name and last name
            </p>
            {/* <span className="login-title">
              {first_name} {last_name}
            </span> */}

            <span style={{ color: "grey" }} className="register-name-display">
              {email}
            </span>
            <div className="login-email">
              <input
                className="login-firstname-input"
                type="text"
                placeholder="Enter First Name"
                required
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </div>
            <div className="login-email">
              <input
                className="login-lastname-input"
                type="text"
                placeholder="Enter Last Name"
                required
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
            </div>
            <div className="login-next-container">
              {errorMessage && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  {errorMessage}{" "}
                </div>
              )}
              <button 
              
              disabled={!first_name || ! last_name } onClick={handleUserData} className={`login-next-button ${!first_name || ! last_name ? 'disabled-button' : ''}`}>
                Choose Interests
              </button>
            </div>
            <div className="login-register-container">
              <Link className="login-register-button" to="/login">
                Login
              </Link>
              <Link className="login-home-button" to="/">
                Home
              </Link>
            </div>
          </div>
        )}

      {/* Intersets step 4 */}
      {emailStepCompleted &&
        isPasswordStepCompleted &&
        isUserDetailsStepCompleted && !isEmailVerifCompleted && (
          <div className="login-container">
            <h1 className="login-heading">Choose Interests</h1>
            <p className="login-paragraph">
              Choose atleast 5 interests from below to get started.
            </p>
            <span className="login-title">
              {first_name} {last_name}
            </span>
            <div>
              {allIntersetFromAPI.map(interest => (
                <button
                  className={`interest-button ${
                    selectedInterests.includes(interest) ? "selected" : ""
                  }`}
                  onClick={() => handleInterestClick(interest)}
                >
                  {interest.interestName}
                  {/* {selectedInterests.includes(interest) && <span className="tick-mark">✔</span>} */}
                </button>

              ))}
              
            </div>
            <div>
            <ReCAPTCHA sitekey={GOOGLE_CAPTCHA_SITE_KEY}
            ref = {captchaRef}
            onChange={handleCaptchaChange} />
            </div>

            <div className="login-next-container">
              {errorMessage && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  {errorMessage}{" "}
                </div>
              )}
              <button onClick={submit} 
              className={`login-next-button ${!isCaptchaSuccess || !selectedInterests ? 'disabled-button' : ''}`}
              // className="login-next-button"
              disabled={!isCaptchaSuccess}>
                Finish SignUp
              </button>
            </div>
          </div>
        )}

        {/* Verify email step 5 */}
      {emailStepCompleted &&
        isPasswordStepCompleted &&
        isUserDetailsStepCompleted &&
        isInterestStepsCompleted && !isEmailVerifCompleted && (
          < VerifyEmail first_name={first_name} email ={email} />
        )}
       
    </>
  );
};
export default Register;
