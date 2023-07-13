import {
  React,
  useEffect,
  useParams,
  useContext,
  AuthContext,
  BACKEND_BASE_URL,
  axios,
  useState,
  ARTICLE_SERVER_NODE_BASE_URL,
  useQuery,
  GET_ARTICLES_BY_AUTHOR,
  ApolloClient,
  InMemoryCache,
  HomePostContainer,
  RoundLoading,
  Draft,
  gql,
  adminAxiosToDjangoServerInterceptor
} from "../index";
import "./AuthorProfile.css";

const client = new ApolloClient({
  uri: `${ARTICLE_SERVER_NODE_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

const AuthorProfile = () => {
  const { username } = useParams();
  const [author, setAuthor] = useState({});
  const [activeTab, setActiveTab] = useState("home");
  const [articles, setArticles] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setUserId(user?.user_id);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_BASE_URL}/user/author-details/${username}`
        );
        const { id, user_name, first_name, last_name, email } = response.data;
        setAuthor({ id, user_name, first_name, last_name, email });

        // Node Mongodb query for drafts of the author
        if (author && user && (author?.id === user?.user_id)) {
          const draftsResponse = await adminAxiosToDjangoServerInterceptor.get(
            `${ARTICLE_SERVER_NODE_BASE_URL}/user/all-drafts/${id}`
          );
          setDrafts(draftsResponse.data);
        }
        console.log('username in author profile', username);
        // Node Mongodb Query for Article List
        const { data, loading, error } = await client.query({
          query: GET_ARTICLES_BY_AUTHOR,
          variables: { userName: username }
        });
        if (error) {
          console.log('aricles by author error', error);
        }
        if (data) {
          console.log('aricles by author', data);
          setArticles(data.articlesByAuthor);
        }
        if (loading) {
          console.log("loading", loading);
          return <RoundLoading />;
        }
      } catch (error) {
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="profile_container">
      <div className="profile_name_container">
        <span>{author?.first_name + " " + author?.last_name}</span>
      </div>
      <div className="profile_tab-navigation">
        <button
          className={activeTab === "home" ? "active" : ""}
          onClick={() => handleTabClick("home")}
        >
          Home
        </button>
        <button
          className={activeTab === "about" ? "active" : ""}
          onClick={() => handleTabClick("about")}
        >
          About
        </button>

        {author?.id === user?.user_id && (
          <button
            className={activeTab === "drafts" ? "active" : ""}
            onClick={() => handleTabClick("drafts")}
          >
            Drafts
          </button>
        )}
      </div>
      {/* Contents */}
      <div className="profile_tab-content">
        {activeTab === "home" && (
          <div>
            {articles.map((article) => (
              <HomePostContainer
                key={article.articleId}
                title={article.title}
                category={article.category[0]}
                is_premium={article.is_premium}
                readingTime={article.readingTime}
                articleId={article.articleId}
                summary={article.summary}
                previewImage={article.previewImage}
              />
            ))}
          </div>
        )}
        {activeTab === "about" && (
          <div className="profile_tab_about_container">
            <span>{author.email}</span>
          </div>
        )}

        {activeTab === "drafts" && (
          <div>
            {drafts.map((draft) => (
              <Draft
                key={draft._id}
                title={draft.title}
                body={draft.body}
                id={draft._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
