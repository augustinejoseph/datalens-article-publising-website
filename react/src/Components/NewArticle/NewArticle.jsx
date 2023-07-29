import { title } from "process";
import {
  axios,
  ARTICLE_SERVER_NODE_BASE_URL,
  ReactQuill,
  modules,
  formats,
  useContext,
  AuthContext,
  useNavigate,
  calculateReadingTime,
  useState,
  useEffect,
  uploadImageToFirebase,
  deleteImageFromFirebase,
  adminAxiosToDjangoServerInterceptor,
  // storage,
  useLocation,
  ArrowLeftCircleFill,
  deleteDraft,
  useToast,
  LoadingModal,
} from "../index";
import { storage } from "../../Firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./NewArticle.css";
// import storage from '../../Firebase/FirebaseConfig'

const NewArticle = () => {
  const [loadingButton, setLoadingButton] = useState(true);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const user_id = user?.user_id;
  const name = user?.name;
  const user_name = user?.user_name;
  const [content, setContent] = useState({});
  // const [content, setContent] = useState({ title: "", body: "" });
  const [summaryValue, setSummaryValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isArticleWritingCompleted, setArticleWritingCompleted] =
    useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [readingTime, setReadingTime] = useState();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isPublishButtonDisabled, setIsPublishButtonDisabled] = useState(true);

  // Editing Draft
  const location = useLocation();
  const id = location?.state?.id;
  //
  //
  //
  //
  //
  //

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${ARTICLE_SERVER_NODE_BASE_URL}/open/all-categories`,
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchDraft = async () => {
        setLoading(true);
        try {
          const response = await adminAxiosToDjangoServerInterceptor.get(
            `${ARTICLE_SERVER_NODE_BASE_URL}/user/draft/${id}`,
          );

          const { title, body } = response.data;
          console.log(
            "title in draft recieved in editor after spreading",
            title,
          );

          setContent({
            ...content,
            title: response.data.title || content.title,
            body: response.data.body.ops || [],
          });
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching draft:", error);
        }
      };

      fetchDraft();
      setNextButtonDisabled(!content.title || !content.body);
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleContentChange = (value, delta, source, editor) => {
    const newContent = { ...content, body: editor.getContents() };
    setContent(newContent);
    setNextButtonDisabled(!content.title || !content.body);

    const text = editor.getText();
    const words = text.trim().split(/\s+/);
    const summary = words.slice(0, 50).join(" ");
    setSummaryValue(summary);

    const bodyHTML = editor.getHTML();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = bodyHTML;
    const firstImage = tempDiv.querySelector("img");

    if (firstImage && firstImage.src) {
      const firstImageSrc = firstImage.src;
      setPreviewImage(firstImageSrc);
      //
    } else {
      setPreviewImage("");
      //
    }
    const readingTime = calculateReadingTime(words.length);
    setReadingTime(readingTime);

    // Upload image to firebase
    const containerDiv = document.createElement("div");
    containerDiv.innerHTML = bodyHTML;
    const images = containerDiv.querySelectorAll("img");

    const uploadImages = async () => {
      const newUploadedImages = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const file = image.getAttribute("src");

        try {
          const fileName = `article_${Date.now()}`;
          const storageRef = ref(storage, `/user-profilePhoto` + fileName);
          await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);

          newUploadedImages.push(downloadUrl);
        } catch (error) {
          console.error(`Error uploading image ${i + 1}:`, error);
        }
      }

      setUploadedImages(newUploadedImages);
    };

    uploadImages();
  };

  const handleTitleChange = (e) => {
    const newContent = { ...content, title: e.target.value };
    setContent(newContent);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("articleData");
    setContent({ title: "", body: "" });
  };

  // Save to Draft and update draft
  const handleSaveToDraft = async () => {
    const updatedContent = {
      ...content,
      user_id: user_id,
      name: name,
    };
    try {
      if (id) {
        try {
          setLoading(true);
          const response = await adminAxiosToDjangoServerInterceptor.put(
            `${ARTICLE_SERVER_NODE_BASE_URL}/user/update-draft/${id}`,
            updatedContent,
          );

          setLoading(false);
          showToast(response.data.message, response.status);
          navigate(`/user/${user?.user_name}` || "/");
        } catch (error) {
          setLoading(false);
          showToast("Failed to update draft", 500);
        }
      } else {
        setLoading(true);
        const response = await adminAxiosToDjangoServerInterceptor.post(
          `${ARTICLE_SERVER_NODE_BASE_URL}/user/save-to-draft`,
          updatedContent,
        );
        setLoading(false);
        showToast(response.data.message, response.status);

        navigate(`/user/${user?.user_name}` || "/");
      }
    } catch (error) {
      setLoading(false);
      showToast(response.data.message, response.status);
      setErrorMessage("An error occurred while saving the article to draft");
      console.error("Error saving to draft:", error);
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  // Publish Article and edit article republish
  const handlePublish = async () => {
    const updatedContent = {
      ...content,
      user_id: user_id,
      name: name,
      summary: summaryValue,
      hashtags: hashtags,
      category: selectedCategories,
      previewImage: previewImage,
      readingTime: readingTime,
      user_name: user_name,
    };

    try {
      if (id) {
        setLoading(true);
        const response = await adminAxiosToDjangoServerInterceptor.post(
          `${ARTICLE_SERVER_NODE_BASE_URL}/user/new-article`,
          updatedContent,
        );
        deleteDraft(id);
        setLoading(false);
        showToast(response.data.message, response.status);

        const articleId = response.data.articleId;
        setTimeout(() => {
          navigate(`/article/${articleId}`);
        }, 1000);

        setContent({ title: "", body: "" });
      } else {
        setLoading(true);
        const response = await adminAxiosToDjangoServerInterceptor.post(
          `${ARTICLE_SERVER_NODE_BASE_URL}/user/new-article`,
          updatedContent,
        );
        const articleId = response.data.articleId;
        showToast(response.data.message, response.status);
        setTimeout(() => {
          setSuccessMsg("");
          setLoading(false);
          navigate(`/article/${articleId}`);
        }, 1000);
        setContent({ title: "", body: "" });
      }
    } catch (error) {
      setLoading(false);

      showToast("Internal server Error", 500);
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedCategories(selectedOptions);

    const isCategorySelected = selectedOptions.length > 0;
    setIsPublishButtonDisabled(
      !isCategorySelected || !content.title || !content.body,
    );
  };

  const handleHashtagChange = (e) => {
    const inputValue = e.target.value;
    const words = inputValue.replace(/\s+/g, " ").split(" ");

    setHashtags(words);
  };

  return loading ? (
    <LoadingModal />
  ) : (
    <div>
      {errorMessage && (
        <div className="newarticle_errormessage">{errorMessage}</div>
      )}
      {successMsg && (
        <div className="newarticle_successmessage">{successMsg}</div>
      )}
      {!isArticleWritingCompleted ? (
        <div className="newarticle_container">
          <div className="newarticle_actions">
            {!isArticleWritingCompleted ? (
              <button
                className={
                  isNextButtonDisabled
                    ? "newarticle_nextbutton_disabled1"
                    : "newarticle_nextbutton"
                }
                disabled={isNextButtonDisabled}
                onClick={() => setArticleWritingCompleted(true)}
              >
                Next
              </button>
            ) : (
              <button onClick={handlePublish}>Publish</button>
            )}
            <button
              className="newarticle_clear_draft_button"
              onClick={clearLocalStorage}
            >
              Clear Draft
            </button>
            <button
              className={
                isNextButtonDisabled
                  ? "newarticle_nextbutton_disabled1"
                  : "newarticle_nextbutton"
              }
              disabled={isNextButtonDisabled}
              onClick={handleSaveToDraft}
            >
              Save as Draft
            </button>
          </div>
          <div className="newarticle_title">
            <input
              placeholder="Tell a Story...!"
              value={content.title || ""}
              onChange={handleTitleChange}
            />
          </div>
          {/* <div className="newarticle_quill_container"> */}

          <ReactQuill
            className="newarticle_quill"
            placeholder="Start crafting a story..."
            modules={modules}
            formats={formats}
            theme="snow"
            value={content.body || ""}
            onChange={handleContentChange}
          />
          {/* </div> */}
        </div>
      ) : (
        <div className="articleCompleted_container">
          <div className="articleCompleted_buttons">
            <button
              onClick={() => {
                setArticleWritingCompleted(false);
              }}
            >
              <ArrowLeftCircleFill />
            </button>
            <button
              className={
                isPublishButtonDisabled
                  ? "articleCompleted_publish_disabled"
                  : "articleCompleted_publish"
              }
              disabled={isPublishButtonDisabled}
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
          <div className="articleCompleted_details_container">
            <div className="articleCompleted_preview">
              <span>Story Preview</span>
              <img
                style={{ height: "200px", width: "350px" }}
                src={previewImage}
                alt="Preview"
              />
              <span>Write a summary</span>
              <div className="articleCompleted_summary">
                <textarea
                  required
                  value={summaryValue}
                  onChange={(e) => setSummaryValue(e.target.value)}
                />
              </div>
            </div>
            <div className="articleCompleted_publishingDetails">
              <span className="articleCompleted_authorname">
                Publishing to: {user.name}
              </span>
              <span className="articleCompleted_category">
                Select Categories
              </span>
              <div>
                <select
                  className=""
                  value={selectedCategories[0] || ""}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="dropdown-options">
                  {categories.map((category) => (
                    <div
                      // key={category._id}
                      className="dropdown-option"
                      selected={selectedCategories[0] === category._id}
                      onClick={() => setSelectedCategories([category._id])}
                    >
                      {/* {category.name} */}
                    </div>
                  ))}
                </div>
              </div>
              <span className="articleCompleted_hashtags">Add Hashtags</span>
              <div className="articleCompleted_hashtag">
                <input
                  // className="articleCompleted_hashtag"
                  value={hashtags.join(" ")}
                  onChange={handleHashtagChange}
                />
              </div>
            </div>

            <div className="articleCompleted_buttons_mobile">
              <button
                onClick={() => {
                  setArticleWritingCompleted(false);
                }}
                className="articleCompleted_publish"
              >
                Back
              </button>
              <button
                className={
                  isPublishButtonDisabled
                    ? "articleCompleted_publish_disabled"
                    : "articleCompleted_publish"
                }
                disabled={isPublishButtonDisabled}
                onClick={handlePublish}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArticle;
