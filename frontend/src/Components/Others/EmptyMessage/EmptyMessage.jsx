import "./EmptyMessage.css";
import { Link, React } from "../../index";

const EmptyMessage = ({ place, link, action }) => {
  return (
    <div className="empty_container">
      <span className="empty_message">No {place} found</span>
      <span className="empty_link">
        {action} new {place} <Link to={link}>here</Link>
      </span>
    </div>
  );
};

export default EmptyMessage;
