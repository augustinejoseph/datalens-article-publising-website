import imageFull from "../../Constants/full_logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../Contexts/AuthContext";
import Logout from "../Authentication/Logout";
import "./Navbar.css";
import { Navigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;
  console.log('user name',user?.name)
  console.log('user admin', user?.is_admin)
  console.log("navbar username from auth", user?.user_name);


  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleProfileClick =() => {
    navigate("/user/"+user.user_name)
  }

  return (
    <div className="nav_container">
      <div className="nav_left">
        <Link to="/"><img src={imageFull} alt="logo" /></Link>
      </div>
      <div className="nav_right">
        {user ? (
          <div className="nav_userContainer" onClick={handleClick}>
            {!user.is_admin && user ? <Link to="/new-article">New Idea</Link> : ""}
            {!user.is_admin && user && currentUrl === '/new-article' ? "" : "" } 
            {user.is_admin ? (<Logout />) : (
              <button onClick={handleProfileClick}>{user.name}</button>
            )}
            {/* {user.is_admin ? " " : <Link to="/ account">{user?.name}</Link>} */}
            
            {/* {user.is_admin ? "Admin" : ""} */}
            {showModal && user.name && !user.is_admin && (
              <div className="nav_modal">
                <button className="nav_closeBtn" onClick={handleClick}>
                  &times;
                </button>
                <ul>
                  <li>Account</li>
                  <li>Write</li>
                  <li>About</li>
                  <li>Home</li>
                  {user ? <Logout currentUrl={currentUrl}/> : <Link to=""></Link>}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            {currentUrl === "/admin-login" ? (
              <Link to="/">View Site</Link>
              
              ) :
               
              (
                <div>
                {currentUrl === "/login" ? (

                  <Link to="/register">Register</Link>
                ) :
                (
                  <>
                  <Link style={{paddingRight:"10px"}} to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                  </>

                )}
                </div>

                )}
          </div>

          // <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
// <Link to="/login">Login</Link>
