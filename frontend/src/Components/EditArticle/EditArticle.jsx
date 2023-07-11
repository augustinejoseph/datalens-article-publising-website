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
    Footer,
    HomePostContainer,
    PageNotFound,
    adminAxiosToDjangoServerInterceptor
  } from '../index'
  import './EditArticle.css'
const EditArticle = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await adminAxiosToDjangoServerInterceptor.get(`${ARTICLE_SERVER_NODE_BASE_URL}open/article/${articleId}`);
        setTitle(response.data.title);
        setContent(response.data.body);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData();
  }, [articleId]);

  const handleContentChange = (value, delta, source, editor) => {
    setContent(value);

    const text = editor.getText();
    const words = text.trim().split(/\s+/);
    const articleReadingTime = calculateReadingTime(words.length);
    setReadingTime(articleReadingTime);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await adminAxiosToDjangoServerInterceptor.put(
        `${ARTICLE_SERVER_NODE_BASE_URL}user/update-article/${articleId}`,
        { title, body: content }
      );
      console.log("Article updated:", response.data);
      setSuccessMsg("Article updated successfully.");
      setTimeout(() => {
        setSuccessMsg("");
        navigate(`/article/${articleId}`);
      }, 2000);
    } catch (error) {
      setErrorMessage("An error occurred while updating the article.");
      console.error("Error updating article:", error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="newarticle_container">
      {errorMessage && <p className="newarticle_errormessage" >{errorMessage}</p>}
      {successMsg && <p className="newarticle_successmessage">{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div className="editarticle_actions">
          <button className='editarticle_submit_button' type="submit">Make Changes</button>
          <button className='editarticle_submit_button' onClick={() => navigate(`/article/${articleId}`)}>Cancel</button>
        </div>
        <div className="newarticle_title">
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <ReactQuill
            className="newarticle_quill"
            id="body"
            theme="snow"
            value={content}
            modules={modules}
            formats={formats}
            onChange={handleContentChange}
            placeholder="Write your article..."
          />
        </div>
        {/* <div className="newarticle_readingTime">
          Estimated Reading Time: {readingTime} minutes
        </div> */}
      </form>
    </div>
  );
};

export default EditArticle;
