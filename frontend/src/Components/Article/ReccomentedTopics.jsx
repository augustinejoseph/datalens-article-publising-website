import "./ReccomentedTopics.css";
import Button from "../SmallComponents/Button";

import React from "react";

const ReccomentedTopics = () => {
  const style = {
    margin: " 3px 10px",
    cursor: "pointer",
    backgroundColor: "#ECF0F1",
    color: "black",
    padding: "1px 15px 1px 15px",
    borderRadius: "20px",
  };

  return (
    <div className="recomented_topics_container">
      <div className="recomented_topics_heading">
        <span>Reconnected Topics</span>
      </div>
      <div className="recomented_topics_topics">
        <Button style={style} data={{ data: "Politics" }} />
        <Button style={style} data={{ data: "Technology" }} />
        <Button style={style} data={{ data: "VR" }} />
        <Button style={style} data={{ data: "Technology" }} />
        <Button style={style} data={{ data: "Ai" }} />
        <Button style={style} data={{ data: "Vehicle" }} />
      </div>
    </div>
  );
};

export default ReccomentedTopics;
