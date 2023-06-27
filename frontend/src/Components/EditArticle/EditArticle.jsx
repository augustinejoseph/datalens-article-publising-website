// import {
//   React,
//   useState,
//   useEffect,
//   useContext,
//   useNavigate,
//   useParams,
//   axios,
//   ARTICLE_SERVER_NODE_BASE_URL,
//   ReactQuill,
//   AuthContext,
//   modules,
//   formats,
//   calculateReadingTime,
//   HomePostContainer,
//   Footer,
//   PageNotFound,
// } from "./index";
// import "../NewArticle/NewArticle.css";

// const EditArticle = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [content, setContent] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [readingTime, setReadingTime] = useState();
//   const { articleId } = useParams();
//   const [title, setTitle] = useState("");
//   const [isChangesMade, setIsChangesMade] = useState(false);
//   console.log("params in edit", articleId);
// //   console.log("title", title);
//     console.log('content', content);

//   useEffect(() => {
//     // Fetch existing article data if editing
//     const fetchArticleData = async () => {
//       try {
//         const response = await axios.get(
//           `${ARTICLE_SERVER_NODE_BASE_URL}article/${articleId}`
//         );
//         console.log(response);
//         setTitle(response.data.title);
//         setContent(response.data.body);
//       } catch (error) {
//         console.error("Error fetching article data:", error);
//       }
//     };

//     if (articleId) {
//       fetchArticleData();
//     }
//   }, [articleId]);

//   const handleSubmit = () => {
//     const response = axios.put(`${ARTICLE_SERVER_NODE_BASE_URL}api/newarticle/${articleId}`, )
//   };

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleContentChange = (value, delta, source, editor) => {
//     setContent(value);
//     const text = editor.getText();
//     const words = text.trim().split(/\s+/).length;
//     const articleReadingTime = calculateReadingTime(words);
//     console.log("reading time", readingTime);
//     setReadingTime(articleReadingTime);
//   };
//   return (
//     <div className="newarticle_container">
//       {errorMessage && <p className="error">{errorMessage}</p>}
//       {successMsg && <p className="success">{successMsg}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="newarticle_actions">
//           <button disabled={isChangesMade} onClick={() => handleSubmit}>
//             make changes
//           </button>

//           <button
//             onClick={() => {
//               navigate("/");
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//         <div className="newarticle_title">
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={title}
//             onChange={handleTitleChange}
//           />
//         </div>
//         <div>
//           <ReactQuill
//             className="newarticle_quill"
//             id="body"
//             theme="bubble"
//             modules={modules}
//             formats={formats}
//             value={content}
//             onChange={handleContentChange}
//             placeholder="Write your article..."
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditArticle;


// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { ARTICLE_SERVER_NODE_BASE_URL, ReactQuill, calculateReadingTime } from "./index";
// import "../NewArticle/NewArticle.css";


import {
    React,
    useState,
    useEffect,
    useContext,
    axios,
    ARTICLE_SERVER_NODE_BASE_URL,
    ReactQuill,
    AuthContext,
    modules,
    formats,
    useNavigate,
    useParams,
    calculateReadingTime,
    Footer,
    HomePostContainer,
    PageNotFound
  } from './index'
const EditArticle = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`${ARTICLE_SERVER_NODE_BASE_URL}article/${articleId}`);
        setTitle(response.data.title);
        setContent(response.data.body);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData();
  }, [articleId]);

  const handleContentChange = (value, delta, source, editor) => {
    setContent(value);

    const text = editor.getText();
    const words = text.trim().split(/\s+/);
    const articleReadingTime = calculateReadingTime(words.length);
    setReadingTime(articleReadingTime);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${ARTICLE_SERVER_NODE_BASE_URL}article/${articleId}`,
        { title, body: content }
      );
      console.log("Article updated:", response.data);
      setSuccessMsg("Article updated successfully.");
      setTimeout(() => {
        setSuccessMsg("");
        navigate(`/article/${articleId}`);
      }, 2000);
    } catch (error) {
      setErrorMessage("An error occurred while updating the article.");
      console.error("Error updating article:", error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="newarticle_container">
      {errorMessage && <p className="newarticle_errormessage" >{errorMessage}</p>}
      {successMsg && <p className="newarticle_successmessage">{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div className="newarticle_actions">
          <button type="submit">Make Changes</button>
          <button onClick={() => navigate(`/article/${articleId}`)}>Cancel</button>
        </div>
        <div className="newarticle_title">
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <ReactQuill
            className="newarticle_quill"
            id="body"
            theme="bubble"
            value={content}
            modules={modules}
            formats={formats}
            onChange={handleContentChange}
            placeholder="Write your article..."
          />
        </div>
        {/* <div className="newarticle_readingTime">
          Estimated Reading Time: {readingTime} minutes
        </div> */}
      </form>
    </div>
  );
};

export default EditArticle;