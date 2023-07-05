import {
  React,
  useState,
  useEffect,
  useParams,
  useContext,
  AuthContext,
  BACKEND_BASE_URL,
  axios,
  ARTICLE_SERVER_NODE_BASE_URL,
  useQuery,
  GET_ARTICLES_BY_AUTHOR,
  ApolloClient,
  InMemoryCache,
  HomePostContainer,
  RoundLoading,
  Draft,
  gql,
  CardChecklist,
  GET_ARTICLES_BY_CATEGORY,
  GET_ARTICLES_BY_HASHTAG,
  GET_ARTICLES,
  Navigate,
  useNavigate,
} from "../../index";
import "./SortedArticles.css";

const SortedArticle = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recent");
  const [articles, setArticles] = useState([]);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { categoryName, hashtagName } = useParams();
  const isCategory = !!categoryName;
  console.log('--catego--',categoryName);
  console.log('--hashtag---', hashtagName);

  if (categoryName){
  const { loading, error, data } = useQuery(GET_ARTICLES_BY_CATEGORY, {
    variables: { categoryName: categoryName },
  });
  console.log(data);
  useEffect(() => {
    if (data) {
      setArticles(data.articlesByCategory);
    }
  }, [data,categoryName,activeTab]);
  if (loading) {
    return <RoundLoading />;
  }
  if (error) {
    console.log(error);
    // navigate("/error");
  }
}


if(hashtagName){
  const { loading, error, data } = useQuery(GET_ARTICLES_BY_HASHTAG, {
   variables: {hashtagName : hashtagName },
  });
  console.log('sorted article tag data',data);
  useEffect(() => {
    if (data) {
      setArticles(data.articlesByHashtag);
    }
  }, [data,hashtagName,activeTab]);
  if (loading) {
    return <RoundLoading />;
  }
  if (error) {
    console.log("error in  hashtag frontend catch",error);
    // navigate("/error");
  }
}
  return (
    <div className="sortedarticle_container">
      <div className="sortedarticle_name_container">
        <CardChecklist />
        <span> {categoryName || hashtagName}</span>
      </div>
      <div className="sortedarticle_tab-navigation">
        <button
          className={activeTab === "recent" ? "active" : ""}
          onClick={() => handleTabClick("recent")}
        >
          Recent
        </button>
        <button
          className={activeTab === "featured" ? "active" : ""}
          onClick={() => handleTabClick("featured")}
        >
          Featured
        </button>
      </div>
      {/* Contents */}

      <div className="sortedarticle_tab-content">
        {activeTab === "recent" && (
          <div>
            {articles.map((article) => (
              <HomePostContainer
                key={article.articleId}
                title={article.title}
                // category={article.category[0]}
                name={article.name}
                createdAt={article.createdAt}
                is_premium={article.is_premium}
                readingTime={article.readingTime}
                articleId={article.articleId}
                summary={article.summary}
                previewImage={article.previewImage}
                user_id={article.user_id}
              />
            ))}
          </div>
        )}
        {activeTab === "features" && (
          <>
            <HomePostContainer />
            featured
          </>
        )}
      </div>
    </div>
  );
};

export default SortedArticle;
