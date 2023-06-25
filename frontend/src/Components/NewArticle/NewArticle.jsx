import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ARTICLE_SERVER_NODE_BASE_URL } from "../../API/Api";
import "./NewArticle.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import AuthContext from "../../Contexts/AuthContext";
import { modules, formats } from "./tools";
import { useNavigate } from "react-router-dom";
import calculateReadingTime from "../../Functions/readingTime";

const NewArticle = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const user_id = user.user_id;
  const name = user.name;
  const [content, setContent] = useState({});
  const [summaryValue, setSummaryValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isArticleWritingCompleted, setArticleWritingCompleted] =
    useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [readingTime, setReadingTime] = useState()

  console.log("categories", categories);
  console.log("selected categories", selectedCategories);
  console.log("preview img src", previewImage);
  console.log("hash tags", hashtags);
  console.log('next button disabled', isNextButtonDisabled)

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${ARTICLE_SERVER_NODE_BASE_URL}category`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setNextButtonDisabled(!content.title || !content.body);
    const articleData = JSON.stringify(content);
    localStorage.setItem("articleData", articleData);
  }, [content]);

  const handleContentChange = (value, delta, source, editor) => {
    const newContent = { ...content, body: editor.getContents() };
    setContent(newContent);

    const text = editor.getText();
    const words = text.trim().split(/\s+/);
    const summary = words.slice(0, 50).join(" ");
    setSummaryValue(summary);

    const bodyHTML = editor.getHTML();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = bodyHTML;
    const firstImage = tempDiv.querySelector("img");

    if (firstImage && firstImage.src) {
      const firstImageSrc = firstImage.src;
      setPreviewImage(firstImageSrc);
      console.log("Preview image set:", firstImageSrc);
    } else {
      setPreviewImage("");
      console.log("No preview image found");
    }
     const readingTime  = calculateReadingTime(words.length);
     setReadingTime(readingTime)

    console.log("Reading time:", readingTime, "minutes");

  };

  const handleTitleChange = (e) => {
    const newContent = { ...content, title: e.target.value };
    setContent(newContent);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("articleData");
    setContent({ title: "", body: "" });
  };

  const handlePublish = async () => {
    const updatedContent = {
      ...content,
      user_id: user_id,
      name: name,
      summary: summaryValue,
      hashtags: hashtags,
      category: selectedCategories,
      previewImage: previewImage,
      readingTime : readingTime
    };

    try {
      const response = await axios.post(
        `${ARTICLE_SERVER_NODE_BASE_URL}newarticle`,
        updatedContent
      );

      console.log("Article saved:", response.data);
      const articleId = response.data; 
      setSuccessMsg('Article Saved Successfully')
      // setRedirectUrl(articleId)
      console.log('redirect url after article create', articleId)
      setTimeout(() => {
      setSuccessMsg('')
      navigate(`/article/${articleId}`);

      }, 2000);

      // Clear the content
      setContent({ title: "", body: "" });
    } catch (error) {
      setErrorMessage("An error occurred while publishing the article.");
      console.error("Error saving article:", error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedCategories(selectedOptions);
  };

  const handleHashtagChange = (e) => {
    
  };


  return (
    <div>
      {errorMessage && (
        <div className="newarticle_errormessage">{errorMessage}</div>
      )}
      {successMsg && (
        <div className="newarticle_successmessage">{successMsg}</div>
      )}
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
              value={content.title || ""}
              onChange={handleTitleChange}
            />
          </div>
          <ReactQuill
            className="newarticle_quill"
            placeholder="Start crafting a story..."
            modules={modules}
            formats={formats}
            theme="bubble"
            value={content.body || ""}
            onChange={handleContentChange}
          />
        </div>
      ) : (
        <div className="articleCompleted_container">
          <div className="articleCompleted_buttons">
            <button disabled={isNextButtonDisabled} onClick={handlePublish}>
              Publish
            </button>
          </div>
          <div className="articleCompleted_details_container">
            <div className="articleCompleted_preview">
              <span>Story Preview</span>
              <img
                style={{ height: "200px", width: "350px" }}
                src={previewImage}
                alt="Preview"
              />
              <span>Write a summary</span>
              <div className="articleCompleted_summary">
                <input
                  required
                  value={summaryValue}
                  onChange={(e) => setSummaryValue(e.target.value)}
                />
              </div>
            </div>
            <div className="articleCompleted_publishingDetails">
              <span className="articleCompleted_authorname">Publishing to: {user.name}</span>
              <span  className="articleCompleted_category">Select Categories</span>
              <div>
                <select
                  className=""
                  value={selectedCategories[0] || ""}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="dropdown-options">
                  {categories.map((category) => (
                    <div
                      // key={category._id}
                      className="dropdown-option"
                      selected={selectedCategories[0] === category._id}
                      onClick={() => setSelectedCategories([category._id])}
                    >
                      {/* {category.name} */}
                    </div>
                  ))}
                </div>
              </div>
              <span className="articleCompleted_hashtags">Add Hashtags</span>
              <input
                className="articleCompleted_hashtag"
                value={hashtags.join(" ")}
                onChange={handleHashtagChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default NewArticle;
