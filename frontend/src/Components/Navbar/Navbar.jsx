import image from "../../Constants/full_logo.png";
import { FaRegBell, FaRegUser, FaRegEdit } from "react-icons/fa";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar_container">
      <div>
        <img className="logo" src={image} alt="full_logo"></img>
      </div>
      <div className="ul_container">
        <ul className="navbar_ul">
          <li>
            <Link className="navbar_link" to="/login">
              {" "}
              Login
            </Link>
          </li>
          <li className="navbar_li">
            <FaRegEdit />
            write
          </li>
          <li className="navbar_li">
            {" "}
            <FaRegBell />{" "}
          </li>
          <li className="navbar_li">
            {" "}
            <FaRegUser />{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
