import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ARTICLE_SERVER_NODE_BASE_URL } from '../../API/Api';
import './categoryComponent.css';

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${ARTICLE_SERVER_NODE_BASE_URL}category`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create a category
  const createCategory = async () => {
    // Convert the new category name to lowercase
    const lowercaseName = newCategoryName.toLowerCase();

    // Check if the category already exists
    const existingCategory = categories.find(
      (category) => category.name.toLowerCase() === lowercaseName
    );

    if (existingCategory) {
      alert('Category already exists');
      return;
    }

    try {
      const response = await axios.post(`${ARTICLE_SERVER_NODE_BASE_URL}category`, {
        name: lowercaseName,
      });
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  // Delete a category
  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${ARTICLE_SERVER_NODE_BASE_URL}category/${categoryId}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search category"
          className="search-input"
        />
      </div>
      <div className="create-category">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="category-input"
        />
        <button onClick={createCategory} className="create-button">
          Create Category
        </button>
      </div>
      <table className="category-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td>
                <button className="delete-button" onClick={() => deleteCategory(category._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default CategoryComponent;
