export const ARTICLE_SERVER_NODE_BASE_URL = import.meta.env
  .VITE_ARTICLE_SERVER_NODE_BASE_URL;
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const FRONTEND_DOMAIN_NAME = import.meta.env.VITE_FRONTEND_DOMAIN_NAME;
export { default as fullLogo } from "../Constants/full_logo.png";
export { default as premium } from "../Constants/premium.png";
export { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
export { useContext, useState, useEffect, createContext } from "react";
export { default as AuthContext } from "../Contexts/AuthContext";
export { default as Logout } from "./Authentication/Logout/Logout";
export { default as React, useRef } from "react";
export {
  Whatsapp,
  Save2,
  BalloonHeartFill,
  Trash3Fill,
  SaveFill,
  Flag,
  X,
  CardChecklist,
  PersonFill,
  PersonCircle,
  ArrowLeftCircleFill,
  BoxArrowLeft,
  HandThumbsUpFill,
  PersonLinesFill,
  TrashFill,
  PencilSquare,
  ShareFill,
  HandThumbsUp,
  ChatFill,
} from "react-bootstrap-icons";
export { default as axios } from "axios";
export { default as HomeCategoryList } from "./Home/HomeCategoryList";
export { default as HomePostContainer } from "./Home/HomePostContainer/HomePostContainer";
export { default as Footer } from "./Footer/Footer";
export { useQuery, gql } from "@apollo/client";
export { default as RoundLoading } from "./Shimmers/RoundLoading";
export { default as LoadingMainFeed } from "./Shimmers/LoadingMainFeed";
export {
  GET_ARTICLES,
  GET_FEATURED_ARTICLES,
  GET_ARTICLES_BY_AUTHOR,
  GET_ARTICLES_BY_CATEGORY,
  GET_ARTICLES_BY_HASHTAG,
  GET_TRENDING_ARTICLES,
  GET_PREMIUM_ARTICLES,
  GET_ARTICLES_BY_USER_INTEREST,
} from "../Queries/getArticlesGraphQL";
export { ApolloClient, InMemoryCache } from "@apollo/client";
export { useParams } from "react-router-dom";
export { default as calculateReadingTime } from "../Functions/readingTime";
export { default as ReactQuill } from "react-quill";
export { default as FeaturedArticles } from "./Article/FeaturedSidebar/FeaturedArticles";
export { deleteArticle } from "./Article/SingleArticlePage/axios";
export { formats, modules, toolbarOptions } from "./NewArticle/tools";
export { default as DeleteConfirmationBox } from "./Others/Confirmation/DeleteConfirmation/DeleteConfirmationBox";
export { deleteDraft } from "./Draft/Functions";
export {
  uploadImageToFirebase,
  deleteImageFromFirebase,
} from "./NewArticle/Functions";
export { storage } from "../Firebase/FirebaseConfig";
export { default as PageNotFound } from "./Others/PageNotFound";
export { extractBodyText } from "./Draft/Functions";
export { default as Draft } from "./Draft/Draft";
export { default as NewArticle } from "./NewArticle/NewArticle";
export { WhatsappShareButton } from "react-share";
export { default as ErrorPage } from "./Others/ErrorPage";
export { default as SortedArticle } from "./Article/SortedArticles/SortedArticle";
export { default as SideAdvertisement } from "./Advertisements/SideAdvertisement";
export { default as TrendingInSide } from "./Article/TrendingSidebar/TrendingInSide";
export { default as Button } from "./SmallComponents/Button";
export { default as AdminLogin } from "./Authentication/AdminLogin/AdminLogin";
export { default as AdminPanelArticles } from "./Admin/Articles/AdminPanelArticles";
export { default as AdminPanelCategory } from "./Admin/Category/AdminPanelCategory";
export { default as AdminPanelLayout } from "./Admin/Layout/AdminPanelLayout.jsx";
export { default as AdminPanelUser } from "./Admin/Users/AdminPanelUser.jsx";
export { default as AdminProtectedRoute } from "./Authentication/ProtectedRoutes/AdminProtectedRoute.jsx";
export { default as PremiumProtectedRoute } from "./Authentication/ProtectedRoutes/PremiumProtectedRoutes";
export { default as ArticlePage } from "./Article/SingleArticlePage/SingleArticlePage.jsx";
export { default as AuthorProfile } from "./AuthorProfile/AuthorProfile.jsx";
export { default as EditArticle } from "./EditArticle/EditArticle.jsx";
export { default as Home } from "./Home/Home.jsx";
export { default as Login } from "./Authentication/Login/Login.jsx";
export { default as NavigationBar } from "./NavigationBar/NavigationBar.jsx";
export { default as Register } from "./Authentication/Register/Register.jsx";
export { default as UserProtectedRoute } from "./Authentication/ProtectedRoutes/UserProtectedRoute.jsx";
export { default as VerifyEmail } from "./Authentication/Email/VerifyEmail.jsx";
export { default as AdminDashboard } from "./Admin/Dashboard/AdminDashboard.jsx";
export { default as AllFeatured } from "./Article/AllFeatured/AllFeatured";
export { default as SubscriptionPlans } from "./SubscriptionPlans/SubscriptionPlans";
export { ReCAPTCHA } from "react-google-recaptcha";
export { dotenv } from "dotenv";
export { default as MainFeed } from "./Article/MainFeed/MainFeed";
export { default as Sidebar } from "./Article/SideBar/Sidebar";
export { default as EmailVerifiedProtectedRoute } from "./Authentication/ProtectedRoutes/EmailVerifiedProtectedRoute";
export { default as AiFAB } from "./Article/AiFAB/AiFAB";
export { adminAxiosToDjangoServerInterceptor } from "../Axios/AxiosInstance";
export { TokenRefresh } from "../TokenRefresh/TokenRefresh";
export { default as Cookies } from "js-cookie";
export { default as CustomToastContainer } from "./Toast/Toast";
export { useToast } from "../Contexts/ToastContext";
export { default as Banner } from "./Banner/Banner";
export { default as EmptyMessage } from "./Others/EmptyMessage/EmptyMessage";
export { default as LoadingModal } from "./Shimmers/LoadingModal/LoadingModal";
export { default as PaymentSuccess } from "./PaymentStatus/PaymentSuccess";
export { default as PaymentFailed } from "./PaymentStatus/PaymentFailed";
export { default as AdminPanelInterests } from "./Admin/Interests/AdminPanelInterests";
