import "./AdminPanelMain.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../API/Api";
import AdminPanelSidebar from "./AdminPanelSidebar";
import CategoryComponent from "./CategoryComponent";
import ArticlesComponent from "./ArticlesComponent";
import HashtagsComponent from "./HashtagsComponent";
import AdminPanelUser from "./AdminPanelUser";
import AdminDashboard from "./AdminDashboard";
import TrendingComponent from "./TrendingComponent";
import AdvertisementComponent from "./AdvertisementComponent";
import AnalyticsComponent from "./AnalyticsComponent";
import InterestsComponent from "./InterestsComponent";

const AdminPanelMain = ({ selectedOption }) => {
  const renderComponent = () => {
    switch (selectedOption) {
      case "category":
        return <CategoryComponent />;
      case "articles":
        return <ArticlesComponent />;
      case "users":
        return <AdminPanelUser />;
      case "hashtags":
        return <HashtagsComponent />;
      case "interests":
        return < InterestsComponent/>;
      case "dashboard":
        return <AdminDashboard />;
      case "trending":
        return <TrendingComponent />;
      case "advertisement":
        return <AdvertisementComponent />;
        case "analytics":
          return <AnalyticsComponent />;
      default:
        return  <AdminDashboard />
    }
  };
  return <>{renderComponent()}</>;
};

export default AdminPanelMain;
