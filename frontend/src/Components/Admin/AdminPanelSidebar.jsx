import React from 'react'
import './AdminPanelSidebar.css'

const AdminPanelSidebar = ({handleOptionClick}) => {
  const handleClick = (option) => {
    handleOptionClick(option);
  };

  return (
    <div className='admindash_sidebar_container'>
        <button onClick={() => handleClick('dashboard')} >Dashboard</button>
        <button onClick={() => handleClick('users')} >Users</button>
        <button onClick={() => handleClick('category')} >Category</button>
        <button onClick={() => handleClick('interests')} >Interests</button>
        <button onClick={() => handleClick('articles')} >Articles</button>
        <button onClick={() => handleClick('trending')} >Trending</button>
        <button onClick={() => handleClick('advertisement')} >Advertisement</button>
        <button onClick={() => handleClick('analytics')} >Analytics</button>
    </div>
  )
}

export default AdminPanelSidebar
