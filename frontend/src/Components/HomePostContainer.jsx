import React from "react";
import "./HomePostContainer.css";

const HomePostContainer = () => {
  return (
    <div className="homepost_container">
      <div className="homepost_container_firstrow">
        <span>Author</span>
        <span>Date</span>
        <span>Premium</span>
      </div>

      <div className="homepost_container_secondrow">
        <h2>Title</h2>
      </div>

      <div className="homepost_container_thirdrow">
        <p>
          Using ChatGPT Made Me A Better Designer — As a UI/UX designer, I have
          found that incorporating ChatGPT into my design process has greatly
          enhanced my ability to create intuitive and user-friendly
        </p>
        <img src="https://miro.medium.com/v2/da:true/resize:fill:140:140/0*nu7giaItaETOmJ_d.gif"></img>
      </div>

      <div className="homepost_container_forthrow">
        <span>Category</span>
        <span>7 min read</span>
        <span>save</span>
        <span>More</span>
      </div>
    </div>
  );
};

export default HomePostContainer;
