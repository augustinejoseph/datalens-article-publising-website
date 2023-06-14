import React from "react";
import { useContext } from "react";
import AuthContext from "../../Contexts/AuthContext";
import "./Home.css";
import Sidebar from '../Article/Sidebar'
import MainFeed from "../Article/MainFeed";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    // <div className="home_container">
    //   <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
    //     <p className="text-3xl text-gray-700 font-bold mb-5">
    //       Welcome! {user?.name}
    //     </p>
    //     <p>{user?.email}</p>
    //     <p className="text-gray-500 text-lg">
    //       React and Tailwind CSS in action
    //     </p>
    //   </div>
    //   </div>



      <div className="home_container">
      <div className="home_container_mainfeed">
      <MainFeed />
      </div>
      <div className="home_container_sidebar">
      <Sidebar />
      </div>
    </div>


      );    
}

export default Home;
