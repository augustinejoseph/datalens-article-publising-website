import "./HomePostContainer.css";
import {
  useState,
  axios,
  BACKEND_BASE_URL,
  premium,
  FRONTEND_DOMAIN_NAME,
  Link,
  useNavigate,
} from "../../index";
import {
  fetchAuthorData,
  authorNameButton,
  categoryButtonStyle,
} from "./functions";
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
  } = props;
  const datetimeString = createdAt;
  const datetime = new Date(datetimeString);
  const localizedDatetime = datetime.toLocaleDateString();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  // console.log("author", author);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate(`/category/${category.name}`);
  };

  return (
    <div className="homepost_container">
      <div className="homepost_container_firstrow">
        <button style={authorNameButton}>
          <Link to={`${FRONTEND_DOMAIN_NAME}user/${user_name}`}>{name}</Link>
        </button>

        <span>{localizedDatetime}</span>
        {is_premium ? (
          <div onClick={() => navigate("/premium")} className="homepost_container_premium_icon_container">
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
        {/* <span>save</span> */}
        {/* <span>More</span> */}
      </div>
      <div className="homepost_container_fifthrow"></div>
    </div>
  );
};

export default HomePostContainer;
