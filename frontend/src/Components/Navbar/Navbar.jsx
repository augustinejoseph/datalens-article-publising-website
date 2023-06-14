import imageFull from "../../Constants/full_logo.png";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../Contexts/AuthContext";
import Logout from "../Authentication/Logout";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="nav_container">
      <div className="nav_left">
        <Link to="/"><img src={imageFull} alt="logo" /></Link>
      </div>
      <div className="nav_right">
        {user ? (
          <div className="nav_userContainer" onClick={handleClick}>
            {user.is_admin ? <Logout /> : ""}
            <Link to="/profile">{!user.is_admin ? user.name : "Admin"}</Link>
            {showModal && user.name && (
              <div className="nav_modal">
                <button className="nav_closeBtn" onClick={handleClick}>
                  &times;
                </button>
                <ul>
                  <li>Account</li>
                  <li>Write</li>
                  <li>About</li>
                  <li>Home</li>
                  {user ? <Logout /> : <Link to=""></Link>}
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
                  <Link to="/login">Login</Link>

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
