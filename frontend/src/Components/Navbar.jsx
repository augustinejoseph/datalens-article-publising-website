import imageFull from "../Constants/full_logo.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import Logout from "./Logout";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="nav_container">
      <div className="nav_left">
        <img src={imageFull} alt="logo" />
      </div>
      <div className="nav_right">
        {user ? (
          <div className="nav_userContainer" onClick={handleClick}>
            <Link to="/profile">{user.name}</Link>
            {showModal && (
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
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
