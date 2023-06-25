import "./FeaturedArticles.css";
import Button from "../SmallComponents/Button";
import { GET_FEATURED_ARTICLES } from "../../Queries/getArticlesGraphQL";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";