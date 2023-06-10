import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'
import AuthContext from "../Contexts/AuthContext";
import { useContext } from "react";
import jwt_decode from 'jwt-decode';


const Login =() => {
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    // const [loggedIn, setLoggedIn] = useState({})
    const {setUser} = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState("")

    

    const submit = async (e) => {
      e.preventDefault();
      const user = {
        email : email,
        password: password
      }
      try {
        const {data} = await axios.post("http://localhost:8000/user/login", user)
        
        // Storing Access in cookie
        Cookies.set('access_token', data.access_token);
        Cookies.set('refresh_token', data.refresh_token);
        const tokenData = jwt_decode(data.access_token)

        const LoggedInUser = ({
          "name" : tokenData.name,
          "email" : tokenData.email,
          "is_active" : tokenData.is_active,
          "is_banned" : tokenData.is_banned
        })

        setUser(LoggedInUser)
        navigate("/");
      }
      catch (error) {
        if (error.response || error.response.data) {
          setErrorMessage("Invalid email or password")
        } else {
          setErrorMessage("An error occurred during authentication.");
        }
      }

    }

    return(
      <div className="login_container">
        <div className="Auth-form-container d-flex justify-content-center align-items-center">
          <form className="Auth-form" onSubmit={submit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              { errorMessage && <div> {errorMessage}</div>}
              <div className="form-group mt-3">
                <label>Email</label>
                <input className="form-control mt-1" 
                  placeholder="Enter Email" 
                  name='email'  
                  type='email' value={email}
                  required 
                  onChange={e => setEmail(e.target.value)}/>
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input name='password' 
                  type="password"     
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}/>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" 
                   className="btn btn-primary">Submit</button>
              </div>
            </div>
         </form>
       </div>
       </div>
    )
}
export default Login;