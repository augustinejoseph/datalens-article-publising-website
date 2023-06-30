import React, { useEffect } from "react";
import "./HomePostContainer.css";
import { Link } from "react-router-dom";
import { FRONTEND_DOMAIN_NAME } from "../../Admin";
import { useState, axios, BACKEND_BASE_URL } from "../../index";
import { fetchAuthorData, authorNameButton, categoryButtonStyle } from "./functions";
const HomePostContainer = (props) => {
  const {
    title,
    name,
    articleId,
    createdAt,
    is_premium,
    user_id,
    summary,
    category,
    readingTime,
    previewImage,
  } = props;
  const datetimeString = createdAt;
  const datetime = new Date(datetimeString);
  const localizedDatetime = datetime.toLocaleDateString();
  const [author, setAuthor] = useState({});
  console.log("author", author);

  useEffect(() => {
    fetchAuthorData(BACKEND_BASE_URL, user_id, setAuthor, axios);
  }, []);

  return (
    <div className="homepost_container">
      <div className="homepost_container_firstrow">
        <button
          style={authorNameButton}
        >
          <Link to={`${FRONTEND_DOMAIN_NAME}user/${author.user_name}`}>
            {name}
          </Link>
        </button>

        <span>{localizedDatetime}</span>
        <span>{is_premium}</span>
      </div>

      <Link
        to={`/article/${articleId}`}
        className="homepost_container_secondrow"
      >
        <h2 className="tooltip">
          {title && title.length > 60 ? `${title.slice(0, 70)}...` : title}
        </h2>
      </Link>

      <Link
        to={`/article/${articleId}`}
        className="homepost_container_thirdrow"
      >
        <p>
          {summary && summary.length > 200
            ? `${summary.slice(0, 200)}...`
            : summary}
        </p>
        <img
          src={
            previewImage
              ? previewImage
              : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
          }
        />
      </Link>

      <div className="homepost_container_forthrow">
        <span style={categoryButtonStyle}>{category?.name}</span>
        <span>{readingTime ? readingTime + "min read" : ""} </span>
        <span>save</span>
        <span>More</span>
      </div>
      <div className="homepost_container_fifthrow"></div>
    </div>
  );
};

export default HomePostContainer;
