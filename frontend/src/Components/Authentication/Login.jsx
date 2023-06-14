import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import AuthContext from "../../Contexts/AuthContext";
import { useContext } from "react";
import jwt_decode from "jwt-decode";
import "./Login.css";
import { BACKEND_BASE_URL } from "../../API/Api";

const Login = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailChecked, setEmailChecked] = useState(false)
  console.log("email check state status", emailChecked)
  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState({})
  const { setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // Email check
  const handleEmailCheck = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    console.log(`${BACKEND_BASE_URL}users/email-check`);
    const response = await axios.post(
      `${BACKEND_BASE_URL}user/email-check`,
      { email: email }
    );

    // const response = await axios.post(
    //   "http://localhost:8000/user/email-check",
    //   { email: email }
    // );
    
    console.log("response from api",response);
    if (response.data.status == true) {
      console.log("email check success");
      setEmailChecked(true)
      setName(response.data.user.first_name)
    } else {
      console.log("else");
      setErrorMessage("Invalid email id");
      setEmailChecked(false)
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
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}user/login`,
        user
      );

      // Storing Access in cookie
      Cookies.set("access_token", data.access_token);
      Cookies.set("refresh_token", data.refresh_token);
      const tokenData = jwt_decode(data.access_token);

      const LoggedInUser = {
        name: tokenData.name,
        email: tokenData.email,
        is_active: tokenData.is_active,
        is_banned: tokenData.is_banned,
        
      };

      setUser(LoggedInUser);
      if (!LoggedInUser.is_active){
        navigate("/verify-email")
      }else{
        navigate("/")
      }
      navigate("/");
    } catch (error) {
      if (error.response || error.response.data) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("An error occurred during authentication.");
      }
    }
  };

  return emailChecked ?
    (<>
      <div className="login-container">
        <h1 className="login-heading">Password</h1>
        <p className="login-paragraph">
          Enter the password
        </p>
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
          {errorMessage && <div style={{ color: "red" , marginTop:"10px" }}>{errorMessage} </div>}
          <button onClick={submit} className="login-next-button">
            Login
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
    )
  :
  (
  <>
  <div className="login-container">
    <h1 className="login-heading">Sign in with email
</h1>
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
      {errorMessage && <div style={{ color: "red" , marginTop:"10px"}}>{errorMessage} </div>}
      <button onClick={handleEmailCheck} className="login-next-button">
        Continue
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
);
};
export default Login;

//     return(
//       <div className="login_container">
//         <div className="Auth-form-container d-flex justify-content-center align-items-center">
//           <form className="Auth-form" onSubmit={submit}>
//             <div className="Auth-form-content">
//               <h3 className="Auth-form-title">Sign In</h3>
//               { errorMessage && <div> {errorMessage}</div>}
//               <div className="form-group mt-3">
//                 <label>Email</label>
//                 <input className="form-control mt-1"
//                   placeholder="Enter Email"
//                   name='email'
//                   type='email' value={email}
//                   required
//                   onChange={e => setEmail(e.target.value)}/>
//               </div>
//               <div className="form-group mt-3">
//                 <label>Password</label>
//                 <input name='password'
//                   type="password"
//                   className="form-control mt-1"
//                   placeholder="Enter password"
//                   value={password}
//                   required
//                   onChange={e => setPassword(e.target.value)}/>
//               </div>
//               <div className="d-grid gap-2 mt-3">
//                 <button type="submit"
//                    className="btn btn-primary">Submit</button>
//               </div>
//             </div>
//          </form>
//        </div>
//        </div>
//     )
// }

// export default Login
