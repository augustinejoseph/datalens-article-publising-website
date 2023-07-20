import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin_table_container">
      <div className="admin_panel_section_title">
        <span>Dashboard</span>
      </div>
      
      <div className="admin_dash_container">
        <div className="admin_dash_overview">
            <div className="admin_dash_overview_users">
                <span>Users</span>
                <span>2</span>
            </div>
            <div className="admin_dash_overview_users">
              <span>Page views</span>
                <span>120</span>
            </div>
            <div className="admin_dash_overview_users">
              <span>Interest</span>
                <span>12</span>
            </div>
            <div className="admin_dash_overview_users">
              <span>categories</span>
                <span>9</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
