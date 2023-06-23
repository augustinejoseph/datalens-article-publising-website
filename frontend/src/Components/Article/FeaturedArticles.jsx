import "./FeaturedArticles.css";
import Button from "../SmallComponents/Button";
import { GET_FEATURED_ARTICLES } from "../../Queries/getArticlesGraphQL";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const FeaturedArticles = () => {
  const { loading, error, data } = useQuery(GET_FEATURED_ARTICLES);
  console.log("features articles", data);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error in Featured Articles:{error.message} </p>;
  }

  const featuredArticles = data.featuredArticles.slice(0, 3);

  const style = {
    margin: " 10px 10px",
    cursor: "pointer",
    backgroundColor: "#ECF0F1",
    color: "black",
    padding: "5px 15px 5px 15px",
    borderRadius: "20px",
  };

  return (
    <div className="home_sidebar_container">
      <div className="home_sidebar_firstrow">
        <span>Featured Articles</span>
      </div>
      {featuredArticles.map((article) => {
        return (
          <div className="featured_wrapper">

          <React.Fragment key={article.articleId}>
            <Link to={`/article/${article.articleId}`}>
            <div className="featured_article_secondrow">
              <p>
                <PersonCircle />
                <p>{article.name}</p>
              </p>
            </div>
            <div className="featured_article_thirdrow">
              <span
                className="tooltip"
                title={article.title}
              >
                {article.title && article.title.length > 40
                  ? `${article.title.slice(0, 37)}...`
                  : article.title}
              </span>
            </div>
            <div className="featured_category_container">
              <span style={style}>
                {article.category[0].name}
              </span>
            </div>
            </Link>
          </React.Fragment>
          </div>

        );
      })}
    </div>
  );
};

export default FeaturedArticles;
