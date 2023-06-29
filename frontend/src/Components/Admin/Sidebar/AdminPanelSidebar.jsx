import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminPanelSidebar.css';
import { PersonFill, BookmarkStarFill, CardHeading, BadgeAdFill, BarChartLineFill } from '../index';

const AdminPanelSidebar = () => {
  const location = useLocation();

  return (
    <div className="admin_sidebar">
      <ul className="menu">
      <li className={`menu-item ${location.pathname === '/admin/dashboard' ? 'admin_sidebar_active' : ''}`}>
          <Link className='admin_sidebar_icon_with_label' to="/admin">
            <span className="icon"><BarChartLineFill /></span>
            <span className="label">Dashboard</span>
          </Link>
        </li>
        <li className={`menu-item ${location.pathname === '/admin/users' ? 'admin_sidebar_active' : ''}`}>
          <Link className='admin_sidebar_icon_with_label' to="/admin/users">
            <span className="icon"><PersonFill /></span>
            <span className="label">Users</span>
          </Link>
        </li>
        <li className={`menu-item ${location.pathname === '/admin/articles' ? 'admin_sidebar_active' : ''}`}>
          <Link className='admin_sidebar_icon_with_label' to="/admin/articles">
            <span className="icon"><CardHeading /></span>
            <span className="label">Articles</span>
          </Link>
        </li>
        <li className={`menu-item ${location.pathname === '/admin/categories' ? 'admin_sidebar_active' : ''}`}>
          <Link className='admin_sidebar_icon_with_label' to="/admin/categories">
            <span className="icon"><BookmarkStarFill /></span>
            <span className="label">Categories</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminPanelSidebar;
