import {
  React,
  useState,
  useEffect,
  useParams,
  useQuery,
  HomePostContainer,
  CardChecklist,
  GET_ARTICLES_BY_CATEGORY,
  GET_ARTICLES_BY_HASHTAG,
  useToast,
  useNavigate,
  EmptyMessage,
  LoadingModal,
} from "../../index";
import "./SortedArticles.css";

const SortedArticle = () => {
  const showToast = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recent");
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { categoryName, hashtagName } = useParams();
  const isCategory = !!categoryName;

  if (categoryName) {
    const { loading, error, data } = useQuery(GET_ARTICLES_BY_CATEGORY, {
      variables: { categoryName: categoryName },
    });
    useEffect(() => {
      if (data) {
        setArticles(data.articlesByCategory);
      }
    }, [data, categoryName, activeTab]);
    if (loading) {
      return <LoadingModal />;
    }
    if (error) {
      showToast("Error", 500);
    }
  }

  if (hashtagName) {
    const { loading, error, data } = useQuery(GET_ARTICLES_BY_HASHTAG, {
      variables: { hashtagName: hashtagName },
    });

    useEffect(() => {
      if (data) {
        setArticles(data.articlesByHashtag);
      }
    }, [data, hashtagName, activeTab]);
    if (loading) {
      <LoadingModal />;
    }
    if (error) {
      showToast("Error", 500);
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
            {articles.length === 0 ? (
              <EmptyMessage
                place="articles"
                link="/category/technology"
                action="Read"
              />
            ) : (
              articles.map((article) => (
                <HomePostContainer
                  key={article.articleId}
                  title={article.title}
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
              ))
            )}
          </div>
        )}
        {activeTab === "featured" && (
          <div>
            {featuredArticles.length === 0 ? (
              <EmptyMessage
                place="articles"
                link="/category/technology"
                action="Read"
              />
            ) : (
              featuredArticles.map((article) => (
                <HomePostContainer
                  key={article.articleId}
                  title={article.title}
                  name={article.name}
                  createdAt={article.createdAt}
                  is_premium={article.is_premium}
                  readingTime={article.readingTime}
                  articleId={article.articleId}
                  summary={article.summary}
                  previewImage={article.previewImage}
                  user_id={article.user_id}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortedArticle;
