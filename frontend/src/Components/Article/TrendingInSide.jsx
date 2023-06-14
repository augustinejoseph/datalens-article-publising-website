import React from "react";
import "./TrendingInSide.css";
import Button from "../SmallComponents/Button";

const TrendingInSide = () => {
    const style = {
        margin: " 3px 10px",
        cursor :"pointer",
        backgroundColor: "#ECF0F1",
        color : "black",
        padding : "1px 15px 1px 15px",
        borderRadius : "20px"
    }
  return (
    <div className="home_sidebar_container">
      <div className="home_sidebar_firstrow">
        <span>Trending</span>
      </div>
      <div className="home_sidebar_secondrow">
        <span>Author Name</span>
      </div>
      <div className="home_sidebar_thirdrow">
        <span>  Post title: My First Immersion in Apple Vision Pro: Heavy, Man!</span>
        
      </div>
      <div className="home_sidebar_forthrow">
      <Button style = {style} data ={{data: "Technology"}}/>
      <Button style = {style} data ={{data: "Technology"}}/>
      <Button style = {style} data ={{data: "Technology"}}/>
      </div>
    </div>
  );
};

export default TrendingInSide;
