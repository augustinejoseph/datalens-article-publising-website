import { AdminPanelSidebar } from "../index";
import "./AdminPanelLayout.css";

const AdminPanelLayout = ({ children }) => {
  return (
    <div className="admin_layout_container">
      <div className="admin_layout_sidebar">
        <AdminPanelSidebar />
      </div>
      <div className="admin_layout_main">{children}</div>
    </div>
  );
};

export default AdminPanelLayout;
