import React, { useEffect, useState } from "react";
import HomeCategoryList from "../../Home/HomeCategoryList";
import HomePostContainer from "../../Home/HomePostContainer";
import "./MainFeed.css";
import axios from "axios";
import { ARTICLE_SERVER_NODE_BASE_URL } from "../../../API/Api";
import { useQuery, gql } from "@apollo/client";
import RoundLoading from "../../Shimmers/RoundLoading";
import LoadingMainFeed from "../../Shimmers/LoadingMainFeed";
import { GET_ARTICLES } from "../../../Queries/getArticlesGraphQL";

export {
  React,
  useEffect,
  useState,
  HomeCategoryList,
  HomePostContainer,
  axios,
  ARTICLE_SERVER_NODE_BASE_URL,
  useQuery,
  gql,
  RoundLoading,
  LoadingMainFeed,
  GET_ARTICLES,
};
