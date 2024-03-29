import {
  React,
  useToast,
  extractBodyText,
  useNavigate,
  deleteDraft,
  ARTICLE_SERVER_NODE_BASE_URL,
  axios,
  DeleteConfirmationBox,
  useState,
  adminAxiosToDjangoServerInterceptor,
} from "../index";
import "./Draft.css";

const Draft = ({ title, body, id }) => {
  const [refreshState, setRefreshState] = useState(true);
  const showToast = useToast();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const bodyText = extractBodyText(body);

  // Edit Draft
  const handleEditDraft = () => {
    navigate("/new-article", { state: { id: id } });
  };

  // Delete Draft
  const handleDeleteDraft = () => {
    setShowConfirmation(true);
  };
  const handleConfirmDelete = () => {
    setRefreshState(!refreshState);
    deleteDraft(id, showToast);
    setShowConfirmation(false);
  };
  const handleCancelDelete = () => {
    setRefreshState(!refreshState);
    setShowConfirmation(false);
  };

  return (
    <div className="draft_container">
      {showConfirmation && (
        <DeleteConfirmationBox
          message="Are you sure you want to delete this draft?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="draft_title">
        <span>{title}</span>
      </div>
      <div className="draft_preview">{bodyText}</div>
      <div className="draft_buttons_container">
        <button onClick={handleEditDraft}>Edit</button>
        <button onClick={handleDeleteDraft}>Delete</button>
      </div>
    </div>
  );
};

export default Draft;
