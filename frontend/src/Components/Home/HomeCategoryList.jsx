import React from "react";
import "./HomeCategoryList.css";
import Button from "../SmallComponents/Button";

const HomeCategoryList = ({ categories, onCategoryClick }) => {
  const style = {
    margin: "0px 0px 0px 30px",
    cursor: "pointer",
    backgroundColor: "#ECF0F1",
    color: "black",
    padding: "1px 15px 1px 15px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  };

  const handleCategoryClick = (categoryId) => {
    onCategoryClick(categoryId);
  };

  return (
    <div className="homecategory_container">
      {categories.map((category) => (
        <span
          key={category._id}
          style={style}
          className="homecategory_category"
          onClick={() => handleCategoryClick(category._id)}
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default HomeCategoryList;
