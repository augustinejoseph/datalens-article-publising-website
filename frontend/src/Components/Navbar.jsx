import image from "../Constants/full_logo.png";
// import { FaRegUser, FaRegEdit } from "react-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import Logout from "./Logout";
import { Dropdown, Navbar as Header, Avatar} from 'flowbite-react';


const Navbar  = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

//   return (
//     <>
 
//     <Header
//       fluid
//       rounded
//     >
//       <Header.Brand href="https://flowbite-react.com">
//         <img
//           alt="Flowbite React Logo"
//           className="mr-3 h-6 sm:h-9"
//           src="/favicon.svg"
//         />
//         <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
//           Flowbite React
//         </span>
//       </Header.Brand>
//       <div className="flex md:order-2">
//         <Dropdown
//           inline
//           label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>}
//         >
//           <Dropdown.Header>
//             <span className="block text-sm">
//               Bonnie Green
//             </span>
//             <span className="block truncate text-sm font-medium">
//               name@flowbite.com
//             </span>
//           </Dropdown.Header>
//           <Dropdown.Item>
//             Dashboard
//           </Dropdown.Item>
//           <Dropdown.Item>
//             Settings
//           </Dropdown.Item>
//           <Dropdown.Item>
//             Earnings
//           </Dropdown.Item>
//           <Dropdown.Divider />
//           <Dropdown.Item>
//             Sign out
//           </Dropdown.Item>
//         </Dropdown>
//         <Header.Toggle />
//       </div>
//       <Header.Collapse>
//         <Header.Link
//           active
//           href="#"
//         >
//           <p>
//             Home
//           </p>
//         </Header.Link>
//         <Header.Link href="#">
//           About
//         </Header.Link>
//         <Header.Link href="#">
//           Services
//         </Header.Link>
//         <Header.Link href="#">
//           Pricing
//         </Header.Link>
//         <Header.Link href="#">
//           Contact
//         </Header.Link>
//       </Header.Collapse>
//     </Header>
  

//     </>
//   );
// }


  return (
    <div className="Header_container">
      <div>
        <Link to="/">
          <img className="logo" src={image} alt="full_logo"></img>
        </Link>
      </div>
      <div className="ul_container">
        <ul className="Header_ul">
        <li>
            <Link className="Header_link" to="/register">

              {user ? "" : "Register"}
            </Link>
          </li>
          <li>
            {user ?
            <Link to="/about/:id">{user.name} <Logout /></Link> :
            <Link to="/login">Login</Link> }
          </li>
          <li>
            {user ?
            < Logout /> :"" }
          </li>
          {user ? <li className="Header_li">
            {/* <FaRegEdit /> */}
            write
          </li> : ""}
          {user ? <li className="Header_li">

            {/* <FaRegBell /> */}
          </li> : ""}
          <li className="Header_li">

            {/* <FaRegUser /> */}
          </li>
        </ul>
      </div>
    </div>
  );
};


export default Navbar;