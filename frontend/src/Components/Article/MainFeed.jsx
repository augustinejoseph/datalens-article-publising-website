import React, { useEffect } from "react";
import HomeCategoryList from "../Home/HomeCategoryList";
import HomePostContainer from "../Home/HomePostContainer";
import "./MainFeed.css";
import axios from "axios";
import { ARTICLE_SERVER_NODE_BASE_URL } from "../../API/Api";
import { useQuery, gql } from "@apollo/client";
import RoundLoading from "../Shimmers/RoundLoading";
import LoadingMainFeed from "../Shimmers/LoadingMainFeed";

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      title
      category {
        name
      }
      name
      createdAt
      summary
      is_premium
      readingTime
      articleId
    }
  }
`;

const MainFeed = () => {
  const { loading, error, data } = useQuery(GET_ARTICLES);

  useEffect(() => {
    
  })
  if (loading) {
    return <LoadingMainFeed />
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const articles = data.articles;
  console.log("data from graphql mainfeed", data);

  return (
    <div className="mainfeed_container">
      <HomeCategoryList />
      {articles.map((article) => (
        <HomePostContainer
          key={article.articleId}
          title={article.title}
          category={article.category[0]}
          name={article.name}
          createdAt={article.createdAt}
          is_premium={article.is_premium}
          readingTime={article.readingTime}
          articleId={article.articleId}
          summary={article.summary}
        />
      ))}
    </div>
  );
};

export default MainFeed;
