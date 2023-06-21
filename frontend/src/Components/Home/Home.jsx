import React from "react";
import { useContext } from "react";
import AuthContext from "../../Contexts/AuthContext";
import "./Home.css";
import Sidebar from '../Article/Sidebar'
import MainFeed from "../Article/MainFeed";

function Home() {
  const { user } = useContext(AuthContext);
  return (

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
