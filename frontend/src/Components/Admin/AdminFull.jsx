import "./AdminPanelMain.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../API/Api";
import AdminPanelSidebar from "./AdminPanelSidebar";
import AdminPanelMain from "./AdminPanelMain";

const AdminFull = () => {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
    };
  
    return (
      <div className="admindash_container">
        <div className="admindash_sidbar_container">
          <AdminPanelSidebar handleOptionClick={handleOptionClick} />
        </div>
        <div className="admindash_main_container">
          <AdminPanelMain selectedOption={selectedOption} />
        </div>
      </div>
    );
  };
  
  export default AdminFull;
