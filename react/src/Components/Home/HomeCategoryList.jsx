import React from "react";
import "./HomeCategoryList.css";
import Button from "../SmallComponents/Button";
import { useNavigate } from "../index";

const HomeCategoryList = ({ categories, onCategoryClick }) => {
  const navigate = useNavigate()
  const style = {
    margin: "0px 0px 0px 30px",
    cursor: "pointer",
    backgroundColor: "#ECF0F1",
    color: "black",
    padding: "1px 15px 1px 15px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  };

  const handleCategoryClick = (name) => {
   navigate(`/category/${name}`)
  };

  return (
    <div className="homecategory_container">
      {categories.map((category) => (
        <span
          key={category._id}
          style={style}
          className="homecategory_category"
          onClick={() => handleCategoryClick(category.name)}
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default HomeCategoryList;
