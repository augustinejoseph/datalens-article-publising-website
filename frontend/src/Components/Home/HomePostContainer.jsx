import React from "react";
import "./HomePostContainer.css";
import { Link } from "react-router-dom";

const HomePostContainer = (props) => {
  const { title, name, articleId, createdAt, is_premium, summary, category } =
    props;
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <Link to={`/article/${articleId}`} className="homepost_container">
      <div className="homepost_container_firstrow">
        <span>{name}</span>
        <span>{formattedDate}</span>
        <span>{is_premium}</span>
      </div>

      <div className="homepost_container_secondrow">
        <h2>{title}</h2>
      </div>

      <div className="homepost_container_thirdrow">
        <p>{summary}</p>
        <img src="https://miro.medium.com/v2/da:true/resize:fill:140:140/0*nu7giaItaETOmJ_d.gif"></img>
      </div>

      <div className="homepost_container_forthrow">
        <span>{category?.name}</span>
        <span>7 min read</span>
        <span>save</span>
        <span>More</span>
      </div>
      <div className="homepost_container_fifthrow"></div>
    </Link>
  );
};

export default HomePostContainer;
