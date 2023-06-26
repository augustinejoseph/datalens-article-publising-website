
import {
  React,
  useState,
  useEffect,
  useContext,
  axios,
  ARTICLE_SERVER_NODE_BASE_URL,
  ReactQuill,
  AuthContext,
  modules,
  formats,
  useNavigate,
  useParams,
  calculateReadingTime,
  HomePostContainer,
  Footer,
  DeleteConfirmationBox,
  deleteArticle,
  TrashFill,
  PencilSquare,
  ShareFill,
  HandThumbsUp,
  Chat,
  FeaturedArticles
  
} from "./index";

const ArticlePage = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [articleBody, setArticleBody] = useState({});
  const { id } = useParams();
  // console.log("single article params", id);
  const datetimeString = article.createdAt;
  const datetime = new Date(datetimeString);
  const localizedDatetime = datetime.toLocaleDateString();
  const { user } = useContext(AuthContext);
  // const [articleId, setArticleId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);


  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(
          `${ARTICLE_SERVER_NODE_BASE_URL}article/${id}`
        );

        setArticle({ ...data });
        setArticleBody(data.body);
      } catch (error) {
        console.log("error in full article", error);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("user", user);
    }, 5);

    return () => clearTimeout(timer);
  }, [user]);

  const handleEditArticle = () => {
    navigate(`/edit-article/${id}`);
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try{
      deleteArticle(id)
      setShowConfirmation(false);
      navigate("/")
    }catch(error){
      console.error(error)
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="article_container">
      <div className="article_inner_container">
        <div className="article_main_heading">
          <span>{article.title}</span>
        </div>
        <div className="article_main_image">
          {article.previewImage && 
          <img src={article.previewImage ? article?.previewImage : ""} alt="Preview" />
}
        </div>
        <div className="article_author_container">
          <span className="article_author_name">{article.name}</span>
          <div className="article_reading_details">
            <span>5 Min Read</span>
            <span>{localizedDatetime}</span>
          </div>
        </div>

        <div className="article_interaction">
          <div className="article_interaction_leftside">
            <span > <HandThumbsUp /> </span>
            <p>{article?.claps || 0}</p>
            <span > <Chat /> </span>
            <p>{article?.comments || 0}</p>
          </div>
          <div className="article_interaction_rightside"></div>
          <div className="article_share_commend_icon">
            {user && article.user_id === user.user_id && (
              <>
                <span onClick={handleEditArticle}>< PencilSquare /></span>
                <span onClick={handleDeleteConfirmation}> < TrashFill/></span>
              </>
            )}
            <span>< ShareFill /></span>
          </div>
        </div>

        {showConfirmation && (
        <DeleteConfirmationBox
          message="Are you sure you want to delete this article?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}


        <div className="article_content_start">
          <ReactQuill
            className="article_quill"
            modules={modules}
            formats={formats}
            theme="bubble"
            readOnly={true}
            value={articleBody}
          />
        </div>
        {/* Related */}

        <div className="article_related_articles">
          < FeaturedArticles />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ArticlePage;
