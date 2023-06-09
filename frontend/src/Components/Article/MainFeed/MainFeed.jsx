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
  useNavigate,
  Banner,
  useContext,
  AuthContext,
  GET_ARTICLES_BY_USER_INTEREST,
  useToast,
} from '../../index'

const MainFeed = () => {
  const showToast = useToast()
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const shouldUserBasedQuery = user && user?.user_id

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${ARTICLE_SERVER_NODE_BASE_URL}/open/all-categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

  }, []);

  const {loading, error, data} = useQuery(GET_ARTICLES) 

  // const {loading, error, data} = useQuery(shouldUserBasedQuery ? GET_ARTICLES_BY_USER_INTEREST : GET_ARTICLES) 

  if (loading) {
    return <LoadingMainFeed />;
  }

  if (error) {
    showToast("Internal server error", 500)
    navigate("/error")
  }

  const articles = data?.articles;

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
          user_name = {article.user_name}
        />
      ))}
      <div className="mainfeed_footer">
      <Footer />
      </div>
    </div>
  );
};

export default MainFeed;
