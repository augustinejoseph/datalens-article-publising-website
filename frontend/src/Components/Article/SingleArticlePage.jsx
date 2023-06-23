import React, { useEffect, useState } from "react";
import "./SingleArticlePage.css";
import HomePostContainer from "../Home/HomePostContainer";
import Footer from "../Footer/Footer";
import { useParams } from "react-router";
import axios from "axios";
import { ARTICLE_SERVER_NODE_BASE_URL } from "../../API/Api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { modules, formats } from "../NewArticle/tools";

const ArticlePage = () => {
  const [article, setArticle] = useState({});
  const [articleBody, setArticleBody] = useState({});
  const { id } = useParams();
  console.log("single article params", id);
  const datetimeString = article.createdAt;
  const datetime = new Date(datetimeString);
  const localizedDatetime = datetime.toLocaleDateString();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${ARTICLE_SERVER_NODE_BASE_URL}article/${id}`
        );
        const {
          title,
          name,
          category,
          body,
          is_banned,
          createdAt,
          is_premium,
          previewImage,
          claps,
        } = response.data;
        setArticle({
          title,
          name,
          category,
          body,
          createdAt,
          is_banned,
          is_premium,
          previewImage,
          claps,
        });
        console.log(response);
        console.log("preview image",previewImage);
        setArticleBody(response.data.body);
      } catch (error) {
        console.log("error in full article", error);
      }
    };
    fetchArticle();
  }, [id]);

  return (
    <div className="article_container">
      <div className="article_inner_container">
        <div className="article_main_heading">
          <span>{article.title}</span>
        </div>
        <div className="article_main_image">
          <img src={article?.previewImage} />
        </div>
        <div className="article_author_container">
          <span className="article_author_name">{article.name}</span>
          <div className="article_reading_details">
            <span>5 Min Read</span>
            <span>{localizedDatetime}</span>
          </div>
        </div>

        <div className="article_interaction">
          <div className="article_interaction_leftside">
            <img src="https://img.icons8.com/?size=512&id=Yv8CCpT6tRjg&format=png" />
            <span>{article?.claps || 0}</span>
            <img src="https://img.icons8.com/?size=512&id=143&format=png" />
            <span>{article?.comments || 0}</span>
          </div>
          <div className="article_interaction_rightside"></div>
          <div className="article_share_commend_icon">
            <span>share</span>
          </div>
        </div>
        <div className="article_content_start">
          <ReactQuill
            className="article_quill"
            modules={modules}
            formats={formats}
            theme="bubble"
            readOnly={true}
            value={articleBody}
          />
        </div>
        {/* Related */}

        <div className="article_related_articles">
          <HomePostContainer />
          <HomePostContainer />
          <HomePostContainer />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ArticlePage;
