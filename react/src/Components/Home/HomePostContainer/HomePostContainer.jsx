import "./HomePostContainer.css";
import {
  useState,
  axios,
  BACKEND_BASE_URL,
  premium,
  FRONTEND_DOMAIN_NAME,
  Link,
  useNavigate,
  useLocation,
  SaveFill,
  Save2,
  AuthContext,
  useContext,
  DeleteConfirmationBox,
  deleteArticle,
  useToast,
  adminAxiosToDjangoServerInterceptor,
  ARTICLE_SERVER_NODE_BASE_URL,
} from "../../index";
import {
  fetchAuthorData,
  authorNameButton,
  categoryButtonStyle,
} from "./functions";
import { Trash2Fill } from "react-bootstrap-icons";

const HomePostContainer = (props) => {
  const {
    title,
    name,
    articleId,
    createdAt,
    is_premium,
    user_id,
    summary,
    category,
    readingTime,
    previewImage,
    user_name,
    authorId,
  } = props;
  const dateObj = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [author, setAuthor] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const currentLocation = location.pathname;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const showToast = useToast();

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate(`/category/${category.name}`);
  };

  // Delete article
  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      deleteArticle(articleId);
      showToast("Article deleted successfully", 200);
      setShowConfirmation(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConvertToPremium = async () => {
    try {
      const response = await adminAxiosToDjangoServerInterceptor.put(
        `${ARTICLE_SERVER_NODE_BASE_URL}/user/make-premium/${articleId}`,
      );
      showToast(response.data.message, response.status);
    } catch (error) {
      showToast("Internal server error", 500);
    }
  };

  return (
    <div className="homepost_container">
      <div className="homepost_container_firstrow">
        <button style={authorNameButton}>
          <Link to={`${FRONTEND_DOMAIN_NAME}/user/${user_name}`}>{name}</Link>
        </button>

        {/* <span>{formattedDate || "12345"}</span> */}
        {is_premium ? (
          <div
            onClick={() => navigate("/premium")}
            className="homepost_container_premium_icon_container"
          >
            <img className="homepost_container_premium_icon" src={premium} />
            Premium
          </div>
        ) : (
          ""
        )}
      </div>

      <Link
        to={`/article/${articleId}`}
        className="homepost_container_secondrow"
      >
        <h2 className="homepost_container_secondrow_title">
          {title && title.length > 60 ? `${title.slice(0, 70)}...` : title}
        </h2>
      </Link>

      <Link
        to={`/article/${articleId}`}
        className="homepost_container_thirdrow"
      >
        <p>
          {summary && summary.length > 200
            ? `${summary.slice(0, 200)}...`
            : summary}
        </p>
        <img
          src={
            previewImage
              ? previewImage
              : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
          }
        />
      </Link>

      <div className="homepost_container_forthrow">
        <div>
          {category?.name ? (
            <span
              onClick={() => handleCategoryClick(category?.name)}
              style={categoryButtonStyle}
            >
              {category?.name}
            </span>
          ) : (
            " "
          )}
          <span>{readingTime ? readingTime + "min read" : ""} </span>
        </div>
        {user?.user_id &&
          (currentLocation === "/" || currentLocation.startsWith("/user/") ? (
            <div className="homepost_container_forthrow_button_container">
              {currentLocation.startsWith("/user/") &&
              authorId === user?.user_id ? (
                <button onClick={handleDeleteConfirmation}>
                  <Trash2Fill />
                </button>
              ) : (
                <Save2 />
              )}

              {location.pathname.startsWith("/user/") &&
              authorId === user?.user_id &&
              user?.is_premium ? (
                <button onClick={handleConvertToPremium}>
                  <div className="homepost_container_premium_icon_container_2">
                    {is_premium ? null : "Make Premium"}
                    <img
                      className="homepost_container_premium_icon_2"
                      src={premium}
                    />{" "}
                  </div>
                </button>
              ) : null}
            </div>
          ) : null)}
      </div>
      {showConfirmation && (
        <DeleteConfirmationBox
          message="Are you sure you want to delete this article?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="homepost_container_fifthrow"></div>
    </div>
  );
};

export default HomePostContainer;
