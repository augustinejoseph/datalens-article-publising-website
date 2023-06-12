import React from "react";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import "./Home.css";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import HomePostContainer from "./HomePostContainer";
import HomeCategoryList from "./HomeCategoryList";
import MainFeed from "./MainFeed";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="home_container">
      {/* <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Welcome! {user?.name}
        </p>
        <p>{user?.email}</p>
        <p className="text-gray-500 text-lg">
          React and Tailwind CSS in action
        </p>
      </div> */}
      <div className="home_container">
        <MainFeed />
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
