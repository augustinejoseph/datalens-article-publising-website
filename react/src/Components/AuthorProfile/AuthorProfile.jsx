import {
  useEffect,
  useParams,
  useContext,
  AuthContext,
  BACKEND_BASE_URL,
  axios,
  useState,
  GET_ARTICLES_BY_AUTHOR,
  ApolloClient,
  InMemoryCache,
  HomePostContainer,
  Draft,
  adminAxiosToDjangoServerInterceptor,
  useToast,
  TokenRefresh,
  EmptyMessage,
  useRef,
  PencilSquare,
  LoadingModal,
} from "../index";
const ARTICLE_SERVER_NODE_BASE_URL = import.meta.env
  .VITE_ARTICLE_SERVER_NODE_BASE_URL;
import "./AuthorProfile.css";
import { handleImageResize } from "./functions";

const client = new ApolloClient({
  uri: `${ARTICLE_SERVER_NODE_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: "same-origin",
});
const AuthorProfile = () => {
  const [loading, setLoading] = useState(true);
  const [refreshState, setRefreshState] = useState(true);
  const { username } = useParams();
  const showToast = useToast();
  const [allInterest, setAllInterests] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [author, setAuthor] = useState({});
  const [activeTab, setActiveTab] = useState("home");
  const [articles, setArticles] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isEditMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(author?.firstName);
  const [lastName, setLastName] = useState(author?.lastName);
  const [savedArticles, setSavedArticles] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data, loading, error } = await client.query({
          query: GET_ARTICLES_BY_AUTHOR,
          variables: { userName: username },
        });

        if (error) {
          setLoading(false);
        }
        if (data) {
          setLoading(false);

          setArticles(data.articlesByAuthor);
        }

        const [allUserInterests, authorDetails, allInterests, savedArticles] =
          await Promise.all([
            axios.get(
              `${BACKEND_BASE_URL}/author/user-interests-by-username/${username}`,
            ),
            axios.get(`${BACKEND_BASE_URL}/author/author-details/${username}`),
            axios.get(`${BACKEND_BASE_URL}/user/all-interests`),
            axios.get(
              `${BACKEND_BASE_URL}/article/all-saved-article/${username}`,
            ),
          ]);

        // Draft
        if (author && user && author?.id === user?.user_id) {
          setLoading(true);

          const draftsResponse = await adminAxiosToDjangoServerInterceptor.get(
            `${ARTICLE_SERVER_NODE_BASE_URL}/user/all-drafts/${username}`,
          );
          setLoading(false);

          setDrafts(draftsResponse.data);
        }

        setAllInterests(allInterests.data);
        setUserInterests(allUserInterests.data.user_interests);
        setSelectedInterests(
          allUserInterests.data.user_interests.map(
            (selectedInterest) => selectedInterest.interest,
          ),
        );
        setSavedArticles(savedArticles.data);

        const { id, user_name, first_name, last_name, email } =
          authorDetails.data;
        setAuthor({ id, user_name, first_name, last_name, email });

      } catch (error) {
        setLoading(false);

        console.error(error);
      }
    };

    fetchData();
  }, [username, activeTab, isEditMode, refreshState, articles]);

  useEffect(() => {
    setFirstName(author?.first_name ?? "");
    setLastName(author?.last_name ?? "");
  }, [author]);

  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest.interestName)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest.interestName),
      );
    } else {
      setSelectedInterests([...selectedInterests, interest.interestName]);
    }
  };

  const editUserDetails = () => {
    setEditMode(true);
  };

  const handleEditSubmit = async () => {
    try {
      setLoading(true);

      const updatedUser = {
        id: author.id,
        first_name: firstName,
        last_name: lastName,
        interests: selectedInterests,
      };

      const response = await axios.post(
        `${BACKEND_BASE_URL}/author/update-user-details`,
        updatedUser,
      );
      TokenRefresh();
      setEditMode(false);
      setLoading(false);

      showToast(response.data.message, 200);
    } catch (error) {
      setLoading(false);

      showToast("Internal server error", 500);
      console.error("Error updating user details:", error);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingModal />
      ) : (
        <div className="profile_container">
          <div className="profile_name_container">
            <span>
              {author.first_name && author.last_name
                ? author?.first_name + " " + author?.last_name
                : "Loading..."}
            </span>
          </div>
          <div className="profile_tab-navigation">
            <button
              className={activeTab === "home" ? "active" : ""}
              onClick={() => handleTabClick("home")}
            >
              Home
            </button>
            {author?.id === user?.user_id && (
              <button
                className={activeTab === "edit" ? "active" : ""}
                onClick={() => handleTabClick("edit")}
              >
                Edit
              </button>
            )}
            <button
              className={activeTab === "saved" ? "active" : ""}
              onClick={() => handleTabClick("saved")}
            >
              Saved
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
          {/* Home */}
          <div className="profile_tab-content">
            {activeTab === "home" && (
              <div>
                {articles.length === 0 ? (
                  <EmptyMessage
                    place="articles"
                    link="/new-article"
                    action="Create"
                  />
                ) : (
                  articles.map((article) => (
                    <HomePostContainer
                      key={article.articleId}
                      title={article.title}
                      category={article.category[0]}
                      is_premium={article.is_premium}
                      readingTime={article.readingTime}
                      articleId={article.articleId}
                      summary={article.summary}
                      previewImage={article.previewImage}
                      authorId={author?.id}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "edit" && (
              <div className="profile_tab_edit_container">
                {/* Profile picture */}
                {/* <div className="profile_tab_edit_picture">
              <img
                src={profileImage }
                alt="profile picture"
                onClick={handleImageClick}
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
              accept="image/*"
            /> */}

                {/* Name */}
                <div className="profile_tab_edit_name">
                  {isEditMode ? (
                    <>
                      <input
                        type="text"
                        value={isEditMode ? firstName : author?.first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="profile_tab_edit_firstname"
                        placeholder="First Name"
                      />

                      <input
                        type="text"
                        value={isEditMode ? lastName : author?.last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        className="profile_tab_edit_lastname"
                        placeholder="Last Name"
                      />
                    </>
                  ) : (
                    <>
                      <div className="profile_tab_edit_firstname">
                        {author?.first_name}
                      </div>
                      <div className="profile_tab_edit_lastname">
                        {author?.last_name}
                      </div>
                    </>
                  )}
                </div>

                {/* Interests */}
                {isEditMode ? (
                  <div className="profile_tab_edit_interests">
                    {allInterest.map((interest) => (
                      <button
                        key={interest.id}
                        className={`interest-button ${
                          selectedInterests.includes(interest.interestName)
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleInterestClick(interest)}
                        style={{
                          backgroundColor: selectedInterests.includes(
                            interest.interestName,
                          )
                            ? "blue"
                            : "green",
                        }}
                      >
                        {interest.interestName}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="profile_tab_edit_interests">
                    {userInterests.map((interest) => (
                      <button className="profile_tab_edit_interests_selected">
                        {interest.interest}
                      </button>
                    ))}
                  </div>
                )}

                {/* Submit button */}
                <div className="profile_tab_edit_submit">
                  {isEditMode ? (
                    <button
                      onClick={handleEditSubmit}
                      className="profile_tab_edit_submit_button"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={editUserDetails}
                      className="profile_tab_edit_button"
                    >
                      <PencilSquare /> Edit
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === "saved" && (
              <div className="profile_tab_saved_container">
                {savedArticles.length === 0 ? (
                  <EmptyMessage place="saved articles" link="/" action="Save" />
                ) : (
                  savedArticles.map((article) => (
                    <HomePostContainer
                      key={article.articleId}
                      title={article.title}
                      readingTime={article.readingTime}
                      articleId={article.articleId}
                      summary={article.summary}
                      previewImage={article.preview_image}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "drafts" && (
              <div>
                {drafts.length === 0 ? (
                  <EmptyMessage
                    place="drafts"
                    link="/new-article"
                    action="Create"
                  />
                ) : (
                  drafts.map((draft) => (
                    <Draft
                      key={draft._id}
                      title={draft.title}
                      body={draft.body}
                      id={draft._id}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthorProfile;
