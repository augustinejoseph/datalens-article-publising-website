import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import { modules, formats } from "./tools";
import "./NewArticle.css";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { sampleData } from "./sampleData";
import { useContext } from 'react';



const NewArticle = () => {
  // const [content, setContent] = useState(() => {
  //   const savedData = localStorage.getItem("articleData");
  //   return savedData ? JSON.parse(savedData) : { title: "", body: "" };

  // });
  const [content, setContent] = useState({})
  console.log(content)

  useEffect(() => {
    const articleData = JSON.stringify(content);
    localStorage.setItem("articleData", articleData);
  }, [content]);

  const handleContentChange = (value, delta, source, editor) => {
    const newContent = { ...content, body: editor.getContents() };
    setContent(newContent);
  };

  const handleTitleChange = (e) => {
    const newContent = { ...content, title: e.target.value };
    setContent(newContent);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("articleData");
    setContent({ title: "", body: "" });
  };

  const handlePublish = () => {
    const user_id = 

    // Make a POST request to the backend server
    fetch('http://localhost:4000/api/newarticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    })
    .then(response => response.json())
    .then(data => {
      // Display success message in the frontend
      console.log('Article saved:', data);
        // Clear the content
        setContent({ title: "", body: "" });
      })
      .catch(error => {
        // Display error message in the frontend
        console.error('Error saving article:', error);
      });
  };
  
  return (
    <div className="newarticle_container">
      <div className="newarticle_actions">
      {/* <button onClick={SaveDraftToServer}>Save to Drafts</button> */}
      <button onClick={handlePublish}>Publish</button>
      <button onClick={clearLocalStorage}>Clear Draft</button>

      </div>
      <div className="newarticle_title">
        <input
          placeholder="Enter a title"
          value={content.title || ""}
          onChange={handleTitleChange}
        />
      </div>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="bubble"
        value={content.body || ""}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default NewArticle;
