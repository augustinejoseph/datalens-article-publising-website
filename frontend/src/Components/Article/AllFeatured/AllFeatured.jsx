import {
  GET_TRENDING_ARTICLES,
  GET_PREMIUM_ARTICLES,
  GET_FEATURED_ARTICLES,
  useLocation,
  useQuery,
  useNavigate,
  useState,
  useEffect,
  HomePostContainer,
} from "../../index";
import "./AllFeatured.css";

const AllFeatured = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState(null);

  const query =
    location.pathname === "/trending"
      ? GET_TRENDING_ARTICLES
      : location.pathname === "/featured"
      ? GET_FEATURED_ARTICLES
      : location.pathname === "/premium"
      ? GET_PREMIUM_ARTICLES
      : null;

  const { loading, error, data } = useQuery(query);

  useEffect(() => {
    if (data) {
      if (location.pathname === "/trending") {
        setArticles(data.trendingArticles);
      } else if (location.pathname === "/featured") {
        setArticles(data.featuredArticles);
      } else if (location.pathname === "/premium") {
        setArticles(data.premiumArticles);
      }
    }
  }, [data, location.pathname]);

  if (loading) {
    return <div>Loading!!!</div>;
  }

  if (error) {
    navigate("/error");
  }

  let renderedArticles = [];

  if (location.pathname === "/trending" && articles) {
    renderedArticles = articles.map((article) => (
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
        user_id={article.user_id}
        user_name={article.user_name}
      />
    ));
  }

  if (location.pathname === "/featured" && articles) {
    renderedArticles = articles.map((article) => (
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
        user_id={article.user_id}
        user_name={article.user_name}
      />
    ));
  }

  if (location.pathname === "/premium" && articles) {
    renderedArticles = articles.map((article) => (
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
        user_id={article.user_id}
        user_name={article.user_name}
      />
    ));
  }

  return (
    <div className="featured_container">
      <div className="featured_title">
        <span>
          {location.pathname === "/featured"
            ? "Featured Articles"
            : location.pathname === "/trending"
            ? "Trending Articles"
            : location.pathname === "/premium"
            ? "Premium Articles"
            : ""}
        </span>
      </div>
      {renderedArticles}
    </div>
  );
};
export default AllFeatured