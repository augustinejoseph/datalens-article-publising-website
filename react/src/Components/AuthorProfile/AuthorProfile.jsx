import {
  React,
  // ARTICLE_SERVER_NODE_BASE_URL,
  useEffect,
  useParams,
  useContext,
  AuthContext,
  BACKEND_BASE_URL,
  axios,
  useState,
  useQuery,
  GET_ARTICLES_BY_AUTHOR,
  ApolloClient,
  InMemoryCache,
  HomePostContainer,
  RoundLoading,
  Draft,
  gql,
  adminAxiosToDjangoServerInterceptor,
  useToast,
  TokenRefresh,
  EmptyMessage,
  useRef,
  PencilSquare,
} from "../index";
const ARTICLE_SERVER_NODE_BASE_URL = import.meta.env.VITE_ARTICLE_SERVER_NODE_BASE_URL;
import "./AuthorProfile.css";
import { handleImageResize } from "./functions";

console.log('server url from .env ', ARTICLE_SERVER_NODE_BASE_URL);
const client = new ApolloClient({
  uri: `${ARTICLE_SERVER_NODE_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: "same-origin",
});
const AuthorProfile = () => {
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

  // console.log("profile picture", profileImage);
  // console.log("user form context", user);
  console.log('all inrerests', allInterest);
  console.log("user interests", userInterests);
  console.log("selected interests", selectedInterests);
  // console.log("new names ", firstName, "  , ", lastName);
  // console.log("authorname form params", username);
  // console.log("saved articles", savedArticles);
  // console.log("all articles by author", articles);
  // console.log("alll drafts from author", drafts);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetch data accessed");

        const { data, loading, error } = await client.query({
          query: GET_ARTICLES_BY_AUTHOR,
          variables: { userName: username },
        });

        if (error) {
          console.log("articles by author error", error);
        }
        if (data) {
          console.log("--------articles by author", data);
          setArticles(data.articlesByAuthor);
        }
        if (loading) {
          console.log("loading", loading);
        }

        console.log("user id", userId, "and", username);
        console.log("author name", username);

        const [allUserInterests, authorDetails, allInterests, savedArticles] =
          await Promise.all([
            axios.get(`${BACKEND_BASE_URL}/author/user-interests-by-username/${username}`),
            axios.get(`${BACKEND_BASE_URL}/author/author-details/${username}`),
            axios.get(`${BACKEND_BASE_URL}/user/all-interests`),
            axios.get(`${BACKEND_BASE_URL}/article/all-saved-article/${username}`),
          ]);

        // Draft
        if (author && user && author?.id === user?.user_id) {
          const draftsResponse = await adminAxiosToDjangoServerInterceptor.get(
            `${ARTICLE_SERVER_NODE_BASE_URL}/user/all-drafts/${username}`
          );
          setDrafts(draftsResponse.data);
        }

        setAllInterests(allInterests.data);
        setUserInterests(allUserInterests.data.user_interests);
        setSelectedInterests(
          allUserInterests.data.user_interests.map(
            (selectedInterest) => selectedInterest.interest
          )
        );
        setSavedArticles(savedArticles.data);

        const { id, user_name, first_name, last_name, email } =
          authorDetails.data;
        setAuthor({ id, user_name, first_name, last_name, email });

        // Rest of your code
      } catch (error) {
        // Handle any errors that occur during the requests
        console.error(error);
      }
    };

    fetchData();
  }, [username, activeTab, isEditMode, refreshState]);

  useEffect(() => {
    setFirstName(author?.first_name ?? "");
    setLastName(author?.last_name ?? "");
  }, [author]);

  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest.interestName)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest.interestName)
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
      const updatedUser = {
        id: author.id,
        first_name: firstName,
        last_name: lastName,
        interests: selectedInterests,
      };

      const response = await axios.post(
        `${BACKEND_BASE_URL}/author/update-user-details`,
        updatedUser
      );
      TokenRefresh();
      setEditMode(false);
      console.log("User details updated successfully");
      showToast(response.data.message, 200);
    } catch (error) {
      showToast("Internal server error", 500);
      console.error("Error updating user details:", error);
    }
  };

  // const handleImageChange = async (e) => {
  //   const selectedFile = e.target.files[0];
  
  //   try {
  //     const resizedImage = await handleImageResize(selectedFile);
  //   setProfileImage(URL.createObjectURL(resizedImage));
  //     console.log("Resized image:", resizedImage);
  //   } catch (error) {
  //     console.error("Error resizing image:", error);
  //   }
  // };
  
  
  // const handleImageClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

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
                        interest.interestName
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
  );
};

export default AuthorProfile;
