// import React, { useEffect, useState } from "react";
// import HomeCategoryList from "../../Home/HomeCategoryList";
// import HomePostContainer from "../../Home/HomePostContainer";
// import "./MainFeed.css";
// import axios from "axios";
// import { ARTICLE_SERVER_NODE_BASE_URL } from "../../../API/Api";
// import { useQuery, gql } from "@apollo/client";
// import RoundLoading from "../../Shimmers/RoundLoading";
// import LoadingMainFeed from "../../Shimmers/LoadingMainFeed";
// import { GET_ARTICLES } from "../../../Queries/getArticlesGraphQL";

import {
  React,
  useEffect,
  useState,
  HomeCategoryList,
  HomePostContainer,
  axios,
  useQuery,
  gql,
  RoundLoading,
  LoadingMainFeed,
  GET_ARTICLES,
  ARTICLE_SERVER_NODE_BASE_URL,
} from "./index.jsx"

const MainFeed = () => {
  const [categories, setCategories] = useState([]);
  const { loading, error, data } = useQuery(GET_ARTICLES);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${ARTICLE_SERVER_NODE_BASE_URL}category`
        );
        setCategories(response.data);
        console.log("categories form mongodb, for mainfeed", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    // All Preview Articles
  }, []);
  if (loading) {
    return <LoadingMainFeed />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const articles = data.articles;
  // console.log("data from graphql mainfeed", data);

  return (
    <div className="mainfeed_container">
      <HomeCategoryList 
      categories={categories} />
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
          previewImage={article.previewImage}
        />
      ))}
    </div>
  );
};

export default MainFeed;
