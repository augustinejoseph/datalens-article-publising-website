import React from "react";
import "./AdminDashboard.css";
import AdminPanelSidebar from "./AdminPanelSidebar";
import AdminPanelMain from "./AdminPanelMain.jsx";

const AdminDashboard = () => {
  return (
    <div className="admindash_container">
      <div className="admindash_sidbar_container">
        <AdminPanelSidebar />
      </div>
      <div className="admindash_main_container">
        <AdminPanelMain />
      </div>
    </div>
  );
};

export default AdminDashboard;
