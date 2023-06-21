import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ARTICLE_SERVER_NODE_BASE_URL } from '../../API/Api';
import './NewArticle.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import AuthContext from '../../Contexts/AuthContext';
import { modules, formats } from "./tools";

const NewArticle = () => {
  const { user } = useContext(AuthContext);
  const user_id = user.user_id;
  const name = user.name;
  const [content, setContent] = useState({});
  const [summaryValue, setSummaryValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isArticleWritingCompleted, setArticleWritingCompleted] = useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);
  console.log('categories', categories)
  console.log('selected categories', selectedCategories)
  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${ARTICLE_SERVER_NODE_BASE_URL}category`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setNextButtonDisabled(!content.title || !content.body);
    const articleData = JSON.stringify(content);
    localStorage.setItem('articleData', articleData);
  }, [content]);

  const handleContentChange = (value, delta, source, editor) => {
    const newContent = { ...content, body: editor.getContents() };
    setContent(newContent);

    const text = editor.getText();
    const words = text.trim().split(/\s+/);
    const summary = words.slice(0, 50).join(' ');
    setSummaryValue(summary);
  };

  const handleTitleChange = (e) => {
    const newContent = { ...content, title: e.target.value };
    setContent(newContent);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('articleData');
    setContent({ title: '', body: '' });
  };

  const handlePublish = async () => {
    const updatedContent = {
      ...content,
      user_id: user_id,
      name: name,
      summary: summaryValue,
      hashtags: ['hashtag1', 'hashtag2'], // Replace with the actual hashtags
      category: selectedCategories, // Use the selected categories
    };

    try {
      const response = await axios.post(`${ARTICLE_SERVER_NODE_BASE_URL}api/newarticle`, updatedContent);
      console.log('Article saved:', response.data);
      // Clear the content
      setContent({ title: '', body: '' });
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  
  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedCategories(selectedOptions);
  };

  return (
    <div>
      {!isArticleWritingCompleted ? (
        <div className="newarticle_container">
          <div className="newarticle_actions">
            {!isArticleWritingCompleted ? (
              <button
                disabled={isNextButtonDisabled}
                onClick={() => setArticleWritingCompleted(true)}
              >
                Next
              </button>
            ) : (
              <button onClick={handlePublish}>Publish</button>
            )}
            <button onClick={clearLocalStorage}>Clear Draft</button>
          </div>
          <div className="newarticle_title">
            <input
              placeholder="Tell a Story...!"
              value={content.title || ''}
              onChange={handleTitleChange}
            />
          </div>
          <ReactQuill
            className="newarticle_quill"
            modules={modules}
            formats={formats}
            theme="bubble"
            value={content.body || ''}
            onChange={handleContentChange}
          />
        </div>
      ) : (
        <div className="articleCompleted_container">
          <div className="articleCompleted_buttons">
            <button
              disabled={isNextButtonDisabled}
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
          <div className="articleCompleted_details_container">
            <div className="articleCompleted_preview">
              <span>Story Preview</span>
              <img style={{ height: '200px', width: '350px' }} src={'dfasd'} alt="Preview" />

              <span>Write a summary</span>
              <input
                className="articleCompleted_summary"
                required
                value={summaryValue}
                onChange={(e) => setSummaryValue(e.target.value)}
              />
            </div>
            <div className="articleCompleted_publishingDetails">
              <span>Publishing to: {user.name}</span>
              <span>Select Categories</span>
              <select multiple value={selectedCategories} onChange={handleCategoryChange}>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArticle;
