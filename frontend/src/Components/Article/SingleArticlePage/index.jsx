import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ARTICLE_SERVER_NODE_BASE_URL } from "../../../API/Api";
import "./SingleArticlePage.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import AuthContext from "../../../Contexts/AuthContext";
import { modules, formats } from "../../NewArticle/tools";
import { useNavigate, useParams } from "react-router-dom";
import calculateReadingTime from "../../../Functions/readingTime";
import HomePostContainer from "../../Home/HomePostContainer";
import Footer from "../../Footer/Footer";
import DeleteConfirmationBox from "../../Others/Confirmation/DeleteConfirmation/DeleteConfirmationBox";
import {deleteArticle} from './axios'
import {TrashFill, PencilSquare, ShareFill, HandThumbsUp, Chat} from "react-bootstrap-icons";
import FeaturedArticles from "../FeaturedArticles/FeaturedArticles";

export {
  React,
  useState,
  useEffect,
  useContext,
  axios,
  ARTICLE_SERVER_NODE_BASE_URL,
  ReactQuill,
  AuthContext,
  modules,
  formats,
  useNavigate,
  useParams,
  calculateReadingTime,
  HomePostContainer,
  Footer,
  DeleteConfirmationBox,
  deleteArticle,
  TrashFill,
  PencilSquare,
  ShareFill,
  HandThumbsUp,
  Chat,FeaturedArticles
};
