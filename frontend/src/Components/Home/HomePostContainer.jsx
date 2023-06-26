import React from "react";
import "./HomePostContainer.css";
import { Link } from "react-router-dom";

const HomePostContainer = (props) => {
  const { title, name, articleId, createdAt, is_premium, summary, category, readingTime, previewImage } =
  props;
  const datetimeString = createdAt;
  const datetime = new Date(datetimeString);
  const localizedDatetime = datetime.toLocaleDateString();

  return (
    <Link to={`/article/${articleId}`} className="homepost_container">
      <div className="homepost_container_firstrow">
        <span>{name}</span>
        <span>{localizedDatetime}</span>
        <span>{is_premium}</span>
      </div>

      <div className="homepost_container_secondrow">
        <h2 className="tooltip">{title && title.length > 60 ? `${title.slice(0, 70)}...` : title}</h2>
      </div>

      <div className="homepost_container_thirdrow">
        <p>{summary && summary.length  >200 ?  `${summary.slice(0,200)}...` : summary}</p>
        <img src={previewImage ? previewImage : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"}/>
      </div>

      <div className="homepost_container_forthrow">
        <span>{category?.name}</span>
        <span>{ readingTime ? readingTime +"min read": ""} </span>
        <span>save</span>
        <span>More</span>
      </div>
      <div className="homepost_container_fifthrow"></div>
    </Link>
  );
};

export default HomePostContainer;
