import {
  Button,
  GET_FEATURED_ARTICLES,
  useQuery,
  gql,
  React,
  PersonCircle,
  Link,
  useNavigate,
} from "../../index.jsx";
import './FeaturedArticles.css'
const FeaturedArticles = () => {
  const navigate = useNavigate()
  const { loading, error, data } = useQuery(GET_FEATURED_ARTICLES);
  console.log("features articles", data);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    navigate("/error")
  }

  const featuredArticles = data.featuredArticles.slice(0, 3);

  const style = {
    margin: " 10px 10px",
    cursor: "pointer",
    backgroundColor: "#ECF0F1",
    color: "black",
    padding: "5px 15px 5px 15px",
    borderRadius: "20px",
  };

  return (
    <div className="home_sidebar_container">
      <div className="home_sidebar_firstrow">
        <span onClick={() => navigate("/featured")}>Featured Articles</span>
      </div>
      {featuredArticles.map((article) => {
        return (
          <div key={article.articleId} className="featured_wrapper">
            <React.Fragment key={article.articleId}>
              <Link to={`/article/${article.articleId}`}>
                <div className="featured_article_secondrow">
                  {/* <div> */}
                    <PersonCircle />
                    <p>{article.name}</p>
                  {/* </div> */}
                </div>
                <div className="featured_article_thirdrow">
                  <span className="tooltip" title={article.title}>
                    {article.title && article.title.length > 40
                      ? `${article.title.slice(0, 37)}...`
                      : article.title}
                  </span>
                </div>
                </Link>
                <div className="featured_category_container">
                  <span onClick={() => navigate(`/category/${article.category[0].name}`)} style={style}>{article.category[0].name}</span>
                </div>
             
            </React.Fragment>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedArticles;
