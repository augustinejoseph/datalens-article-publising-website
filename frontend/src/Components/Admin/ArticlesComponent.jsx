import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import LoadingMainFeed from '../Shimmers/LoadingMainFeed';
import axios from 'axios';
import { ARTICLE_SERVER_NODE_BASE_URL } from '../../API/Api';
import './ArticlesComponent.css'

const ArticlesComponent = () => {
  const [articleId, setArticleId] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const GET_ARTICLES = gql`
    query GetArticles {
      articles {
        title
        category {
          name
        }
        name
        createdAt
        summary
        is_premium
        readingTime
        articleId
        previewImage
        is_banned
        claps
        is_featured
      }
    }
  `;


    // Ban article
  const handleBanToggle = async (articleId, isBanned) => {
    try {
      const response = await axios.put(
        `${ARTICLE_SERVER_NODE_BASE_URL}article-management/ban/${articleId}`,
        { is_banned: !isBanned }
      );

      const updatedArticles = articles.map((article) => {
        if (article.articleId === articleId) {
          return { ...article, is_banned: !isBanned };
        }
        return article;
      });

      setArticles(updatedArticles);

      console.log("Response from ban article admin panel", response.data);
    } catch (error) {
      console.log("Error in banning article:", error);
    }
  };

  // Featured Article
  const handleFeaturedArticle = () => {

  }
  const { loading, error, data } = useQuery(GET_ARTICLES);

  useEffect(() => {
    if (!loading && !error) {
      const articlesData = data.articles;
      setArticles(articlesData);
      console.log(articlesData)
      if (articlesData.length > 0) {
        setArticleId(articlesData[0].articleId);
      }
    }
  }, [loading, error, data]);

  if (loading) {
    return <LoadingMainFeed />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input className='adminArticle_search' type="text" placeholder="Search articles" value={searchQuery} onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Author</th>
            <th>Date</th>
            <th>Category</th>
            <th>Claps</th>
            <th>Title</th>
            <th>Featured</th>
            <th>Delete</th>
            <th>Ban</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((article, index) => (
            <tr key={article.articleId}>
              <td>{index + 1}</td>
              <td>{article.name}</td>
              <td>{article.createdAt}</td>
              <td>{article.category[0].name}</td>
              <td>{article?.claps}</td>
              <td className="title-cell">
                <span title={article.title}>{article.title.substring(0, 40)}</span>
              </td>
              <td>
                <button onClick={() =>handleFeaturedArticle(article.articleId, article.is_featured)}>
                  {article.is_featured ? 'Featured' : 'Not Featured'}
                </button>
              </td>
              <td>
                <button>Delete</button>
              </td>
              <td>
                <button onClick={() => handleBanToggle(article.articleId, article.is_banned)}>
                  {article.is_banned ? 'Unban' : 'Ban'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesComponent;
