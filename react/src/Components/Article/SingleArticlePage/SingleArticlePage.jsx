import "./SingleArticlePage.css";
import { addClap } from "./functions";
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
  HandThumbsUpFill,
  ChatFill,
  FeaturedArticles,
  Whatsapp,
  FRONTEND_DOMAIN_NAME,
  WhatsappShareButton,
  SortedArticle,
  PersonCircle,
  X,
  Navigate,
  AiFAB,
  adminAxiosToDjangoServerInterceptor,
  useToast,
  SaveFill,
  BACKEND_BASE_URL,
  LoadingModal,
} from "../../index";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const ArticlePage = () => {
  const [loading, setLoading] = useState(true)
  const [refreshState, setRefreshState] = useState(true)
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [articleBody, setArticleBody] = useState({});
  const { id } = useParams();
  const [clap, setClaps] = useState(0);
  const datetimeString = article.createdAt;
  const datetime = new Date(datetimeString);
  const options = { month: "long", day: "numeric" };
  const localizedDatetime = datetime.toLocaleDateString(undefined, options);
  const { user } = useContext(AuthContext);
  const [categoryName, setCategoryName] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentButtonDisabled, setCommentButtonDisabled] = useState(true);
  console.log("show comment boolean ", showComment);
  console.log("comment list frmm db", commentsList);
  console.log("comment button disabled", commentButtonDisabled);
  console.log('article', article);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const articleUrl = `${FRONTEND_DOMAIN_NAME}/${id}`;
  const showToast = useToast()

   
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(
          `${ARTICLE_SERVER_NODE_BASE_URL}/open/article/${id}`
        );
        if (!data) {
        setLoading(false)
          showToast("Article not found", 404);
          navigate("/404"); // Redirect to home page
          return;
        }
  
        setArticle({ ...data });
        setArticleBody(data.body);
        setHashtags(data.hashtags);
        setCommentsList(data.comments);
        setLoading(false)
        console.log('full article data-------------------------', data);
      } catch (error) {
        setLoading(false)
        showToast("Error in fetching article", 500);
        navigate('/404')
        console.log("error in full article-----------------------------", error);
      }
    };
  
    fetchArticle();
  }, [id, clap, newComment, refreshState]);
  

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

  const handleUpdateClap = () => {
    addClap(id, ARTICLE_SERVER_NODE_BASE_URL, axios, setClaps);
  };

  const handleConfirmDelete = async () => {
    try {
      deleteArticle(id);
      showToast("Article deleted successfully", 200)
      setShowConfirmation(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setNewComment(value);
    setCommentButtonDisabled(value.trim() === ""); 
  };

  const handleCommentSubmit = async () => {
    const data = {
      user_id: user?.user_id,
      comment: newComment,
      articleId: id,
      user_name: user?.user_name,
      name: user?.name,
    };
    console.log("user data in comment for sending to db", data);
    try {
      const response = await adminAxiosToDjangoServerInterceptor.post(
        `${ARTICLE_SERVER_NODE_BASE_URL}/user/add-comment/${id}`,
        data
      );
      showToast(response.data.message, response.status)
      console.log('response from commnet', response);
      if (response.data && response.data.comments && response.data.comments.length > 0) {
        setNewComment("");
        setCommentsList((prevComments) => [...prevComments, response.data.comments[0]]);
      }
    } catch (error) {
      showToast("Failed to add comment", 500)
      console.log("comment submit error", error);
    }
  };



  const handleAddToSavedArticle = async () => {
    try {
      const response = await adminAxiosToDjangoServerInterceptor.post(`${BACKEND_BASE_URL}/article/add-to-saved-article`, {
        articleId: id,
        userId: user?.user_id,
        previewImage : article.previewImage,
        readingTime : article.readingTime,
        summary : article.summary,
        title : article.title,
        userName : article.user_name,
        userId : user?.user_id,
      });
  
      if (response.status === 200 && response.data.message === 'Article is already saved') {
        showToast('Article is already saved', 200);
      } else if (response.status === 200 && response.data.message === 'Article saved successfully') {
        showToast('Article saved successfully', 200);
      } else {
        console.log(response);
        showToast('Internal server error', 500);
      }
    } catch (error) {
      showToast('Internal server error', 500);
    }
  };
  return (
  
  loading ?
   (<LoadingModal /> ):


   ( <div className="article_container">
      <div className="article_fab_container">
        < AiFAB />
      </div>
      <div className="article_inner_container">
        <div className="article_main_heading">
          <span>{article.title}</span>
        </div>

        <div className="article_author_container">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/user/${article?.user_name}`);
            }}
            className="article_author_name"
          >
            {article.name}
          </span>
          <div className="article_reading_details">
            <span>5 Min Read</span>
            <span>{localizedDatetime}</span>
          </div>
        </div>

        <div className="article_interaction">
          <div className="article_interaction_leftside">
            <span
              className="articel_interaction_button"
              onClick={handleUpdateClap}
            >
              {" "}
              <HandThumbsUpFill />{" "}
            </span>
            <p>{article?.claps || 0}</p>
            <span
              onClick={() => setShowComment(!showComment)}
              className="articel_interaction_button"
            >
              {" "}
              <ChatFill />{" "}
            </span>
            <p>{article.commentsCount || 0}</p>
          </div>
          <div className="article_interaction_rightside">
            {user && article?.user_id === user?.user_id && (
              <>
                <span
                  className="articel_interaction_button"
                  onClick={handleEditArticle}
                >
                  <PencilSquare />
                </span>
                <span
                  className="articel_interaction_button"
                  onClick={handleDeleteConfirmation}
                >
                  {" "}
                  <TrashFill />
                </span>
              </>
            )}
              <span
                  className="articel_interaction_button"
                  onClick={handleAddToSavedArticle}
                >
                  {" "}
                  <SaveFill />
                </span>
            <>
              <WhatsappShareButton url={articleUrl}>
                <Whatsapp className="articel_interaction_button" />
              </WhatsappShareButton>
            </>
            
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
        {hashtags ? (
          <div className="article_hashtags_container">
            {hashtags.map((hashtag) => (
              <span
                onClick={() => navigate(`/tag/${hashtag}`)}
                className="article_hashtag"
              >
                {hashtag}
              </span>
            ))}
          </div>
        ) : (
          ""
        )}
        {/* Related */}

        <div className="article_related_articles">
          <HomePostContainer category={article.category} />
        </div>
        <Footer />
      </div>

      {/* Comment modal */}
      {showComment && (
        <div
          className={`article_comment_container ${
            showComment ? "modal-show" : ""
          }`}
        >
          <div className="article_comment_title">
            <span>Responses ({article.commentsCount})</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setShowComment(false)}
            >
              <X />
            </span>
          </div>

          {user ? (
            <div className="article_comment_input_container">
              <div className="article_comment_inner_container">
                <span>{/* <PersonCircle /> */}</span>
                <span>{`Comment as ` + user.name}</span>
              </div>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Enter your comment..."
                type="text"
              />
              <div className="article_comment_buttons">
                <button
                  disabled={commentButtonDisabled}
                  className={
                    commentButtonDisabled
                      ? "article_comment_buttons_disabled"
                      : "article_comment_button"
                  }
                  onClick={handleCommentSubmit}
                >
                  submit
                </button>
                <button onClick={() => setNewComment("")}>cancel</button>
              </div>
            </div>
          ) : (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login to comment
            </span>
          )}

          {commentsList.length > 0 &&
            commentsList.reverse().map((commentItem) => (
              
              <div key={commentItem._id} className="article_comment_allcomments_container">
                <div className="article_comment_firstcomment_name">
                  {commentItem.name}
                </div>
                <div className="article_comment_firstcomment_comment">
                  {commentItem.comment}
                </div>
              </div>
            ))}


        </div>
      )}
    </div>)
  );
};

export default ArticlePage;

