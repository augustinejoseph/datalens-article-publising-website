import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailStepCompleted, setEmailStepCompleted] = useState(true)
  const [isPasswordStepCompleted, setIsPasswordStepCompleted] = useState(true)
  const [isUserDetailsStepCompleted, setIsUserDetailsStepCompleted] = useState(true)
  const [isInterestStepsCompleted, setIsInterestStepsCompleted] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState({});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  console.log("email in state", email)
  console.log("password is state", password)
  console.log("firstname is state", first_name)
  console.log("lasename is state", last_name)
  console.log("email step completed?", emailStepCompleted)
  console.log("is password valid",isPasswordValid)
  console.log("is password step completed", isPasswordStepCompleted)
  console.log("is user details  completed", isUserDetailsStepCompleted)


  // Email page
  const handleEmailCheck = async (e) => {
    e.preventDefault();
    setErrorMessage("")
    if (email.length ==0 ){
      setErrorMessage("Enter a valid email id")
      return;
    }
    const response = await axios.post("http://localhost:8000/user/email-availability", {email:email})
    console.log(response.data)
    if (response.data == true){
      setEmailStepCompleted(true)
      
    }else{
      setErrorMessage("Account already exists.")
    }
  };

  // Password Check
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValid = validatePassword(newPassword);
    setIsPasswordValid(isValid)
    if (isValid){
      isPasswordValid(true)
    }else{
      isPasswordValid(false)
    }
  };
  const validatePassword = (password) => {
    if (password.length < 8) {
      setErrorMessage("Minimum length is 8");
      return false
    } else {
      const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
      if (!specialChars.test(password)) {
        setErrorMessage("Password must contain at least one special character");
        return false
      } else {
        setErrorMessage("");
        return true
        
      }
    }
  };
  const handlePasswordSubmission = () => {
    if (isPasswordValid) {
      setIsPasswordStepCompleted(true);
    }
  };

  // User Details
  const handleUserData =() => {
    if (first_name.length === 0){
      setErrorMessage("Enter a FirstName")
      setIsUserDetailsStepCompleted(false)
    }else if
      (last_name.length === 0) {
        setErrorMessage("Enter a Last Name")
        setIsUserDetailsStepCompleted(false)
      
    }else{
      setIsUserDetailsStepCompleted(true)
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
    };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/user/register",
        user
      );
      if (data.success) {
        setSuccessMsg(data.message);
        navigate("/login");
      } else {
        setErrorMsg(data.errors);
      }
    } catch (error) {
      console.error("Error: ", error);
      setErrorMsg({ general: "An error occurred. Please try again." });
    }
  };

  return ( 
    <>
    {/* Password Step 2 */}
     { emailStepCompleted && !isPasswordStepCompleted && (
    
      <div className="login-container">
        <h1 className="login-heading">Set a Password</h1>
        <p className="login-paragraph">
          Enter a strong Password
        </p>
        <span className="login-title">{email}</span>
        <div className="login-email">
          <input
            className="login-email-input"
            type="password"
            placeholder=""
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
          <button disabled={!isPasswordValid} onClick={handlePasswordSubmission}  className="login-next-button">
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

{/* Email Step 1 */}
      { !emailStepCompleted && (

<div className="login-container">
<h1 className="login-heading">Sign up with email</h1>
<p className="login-paragraph">
  Enter the email address to create an account.
</p>
<span className="login-title">Your Email</span>
<div className="login-email">
  <input
    className="login-email-input"
    type="email"
    placeholder=""
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
    {/* User Details Step 3 */}
    {emailStepCompleted && isPasswordStepCompleted && !isUserDetailsStepCompleted  && (
       <div className="login-container">
       <h1 className="login-heading">User Details</h1>
       <p className="login-paragraph">
       Enter your first name and last name
       </p>
       <span className="login-title">{first_name}  {last_name}</span>

       <span style={{color:"grey"}} className="register-name-display">{email}</span>
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
         <button onClick={handleUserData}  className="login-next-button">
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

    {emailStepCompleted && isPasswordStepCompleted && isUserDetailsStepCompleted && (
      <div><h1>Interestsa</h1></div>
    )}
    </>
  );
  }
export default Register;
