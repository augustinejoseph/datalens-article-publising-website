import { useQuery, gql } from "@apollo/client";
import LoadingMainFeed from "../../Shimmers/LoadingMainFeed";
import { columns, handleRowClick } from "./functions";
import {
  DataGrid,
  React,
  useEffect,
  useState,
  axios,
  adminAxiosToDjangoServerInterceptor,
  ARTICLE_SERVER_NODE_BASE_URL,
  BACKEND_BASE_URL
} from "../index";
import "./AdminPanelArticles.css";
import { GET_ARTICLES } from "../../../Queries/getArticlesGraphQL";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AdminPanelArticles = () => {
  const theme = createTheme();
  const [articleId, setArticleId] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getRowId = (row, index) => row.articleId;

  // Ban article
  const handleBanToggle = async (id, isBanned) => {
    try {
      const response = await adminAxiosToDjangoServerInterceptor.put(
        `${ARTICLE_SERVER_NODE_BASE_URL}/admin/article/ban/${id}`,
        { is_banned: !isBanned }
      );

      const updatedArticles = articles.map((article) => {
        if (article.articleId === id) {
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
  const handleFeaturedArticle = () => {};
  const { loading, error, data } = useQuery(GET_ARTICLES);

  useEffect(() => {
    if (!loading && !error) {
      const articlesData = data.articles;
      setArticles(articlesData);
      console.log(articlesData);
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
    <div className="admin_table_container">
      <div className="admin_panel_section_title">
        <span>Articles</span>
      </div>
      <div className="admin_panel_search_add">
        <div className="search-container">
          <input
            type="text"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search article"
            className="search-input"
          />
        </div>
      </div>

      <div className="admin_actual_table">
        <ThemeProvider theme={theme}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={articles}
              columns={columns(handleBanToggle)}
              getRowId={getRowId}
              rowHeight={100}
              onRowClick={handleRowClick}
            />
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AdminPanelArticles;
