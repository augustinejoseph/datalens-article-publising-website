import "./MainFeed.css";
import {
  useEffect,
  useState,
  HomeCategoryList,
  HomePostContainer,
  axios,
  useQuery,
  LoadingModal,
  GET_ARTICLES,
  ARTICLE_SERVER_NODE_BASE_URL,
  Footer,
  useNavigate,
  useContext,
  AuthContext,
  GET_ARTICLES_BY_USER_INTEREST,
  useToast,
  EmptyMessage,
  AdsComponent
} from "../../index";

const MainFeed = () => {
  const showToast = useToast();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const shouldUserBasedQuery = user && user?.user_id;

  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${ARTICLE_SERVER_NODE_BASE_URL}/open/all-categories`
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const {
    loading: articlesLoading,
    error,
    data,
  } = useQuery(
    shouldUserBasedQuery ? GET_ARTICLES : GET_ARTICLES,
    {
      variables: shouldUserBasedQuery ? { userId: user?.user_id } : undefined,
    }
  );

  useEffect(() => {
    setLoading(articlesLoading);
    if (initialLoad && !articlesLoading) {
      setInitialLoad(false);
    }
  }, [articlesLoading, initialLoad]);

  // useEffect(() => {
  //   if (initialLoad) {
  //     setLoading(true);
  //   }
  // }, [initialLoad]);

  if (loading || initialLoad) {
    return <LoadingModal />;
  }

  if (error) {
    showToast("Internal server error", 500);
    navigate("/error");
  }

  const articles = shouldUserBasedQuery
    ? data?.articlesByUserInterest ?? []
    : data?.articles;
  console.log(
    "received articles by user interest",
    data?.articlesByUserInterest
  );

  return (
    <div className="mainfeed_container">
      <HomeCategoryList
      key={categories}
      categories={categories} />
      {articles?.length === 0 ? (
        <EmptyMessage
          place="Interests"
          link={`user/${user?.user_name}`}
          action="Add"
        />
      ) : (
        articles?.map((article, index) => (
          <>
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
          {!user?.is_premium &&
            <>{index > 0 && (index + 1) % 3 === 0 && <AdsComponent dataAdSlot='5440106581' />}</>
          }
          </>
        ))
      )}
      <div className="mainfeed_footer">
        <Footer />
      </div>
    </div>
  );
};

export default MainFeed;
