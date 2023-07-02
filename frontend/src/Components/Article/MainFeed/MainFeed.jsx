import { Airplane } from "react-bootstrap-icons";

import "./MainFeed.css";
import {
  React,
  useEffect,
  useState,
  HomeCategoryList,
  HomePostContainer,
  axios,
  useQuery,
  gql,
  RoundLoading,
  LoadingMainFeed,
  GET_ARTICLES,
  ARTICLE_SERVER_NODE_BASE_URL,
  Footer,
} from '../../index'

const MainFeed = () => {
  const [categories, setCategories] = useState([]);
  const { loading, error, data } = useQuery(GET_ARTICLES);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${ARTICLE_SERVER_NODE_BASE_URL}category`
        );
        setCategories(response.data);
        console.log("categories form mongodb, for mainfeed", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    // All Preview Articles
  }, []);
  if (loading) {
    return <LoadingMainFeed />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const articles = data.articles;
  // console.log("data from graphql mainfeed", data);

  return (
    <div className="mainfeed_container">
      <HomeCategoryList 
      categories={categories} />
      {articles.map((article) => (
        <HomePostContainer
          key={article.articleId}
          title={article.title}
          category={article.category[0]}
          name={article.name}
          createdAt={article.createdAt}
          is_premium={article.is_premium}
          readingTime={article.readingTime}
          articleId={article.articleId}
          summary={article.summary}
          previewImage={article.previewImage}
          user_id = {article.user_id}
        />
      ))}
      <div className="mainfeed_footer">
      <Footer />
      </div>
    </div>
  );
};

export default MainFeed;
