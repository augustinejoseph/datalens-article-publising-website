import { useState } from "react";
import { Link } from "react-router-dom";

const VerifyEmail = (props) => {
    const {first_name, email} = props;
    console.log("verify eaml props",props)
    const [errorMessage, setErrorMessage] = useState("")
    return(
        <div className="login-container">
            <h1 className="login-heading">Verify Email</h1>
            <p className="login-paragraph">
              An Account has been created. Verify Email to proceed.
            </p>
            <span className="login-title">
              {first_name} 
            </span>

            <span style={{ color: "grey" }} className="register-name-display">
              {email}
            </span>
            
            
            <div className="login-next-container">
              {errorMessage && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  {errorMessage}{" "}
                </div>
              )}
              <Link to ="/login">
              <button className="login-next-button">
                Already Verified
              </button>
              </Link>
            </div>
            <div className="login-register-container">
            </div>
          </div>
    )

}
export default VerifyEmail;