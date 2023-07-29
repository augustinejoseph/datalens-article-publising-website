import { columns, onBlockUser } from "./functions";
import {
  useEffect,
  useState,
  LoadingModal,
  BACKEND_BASE_URL,
  adminAxiosToDjangoServerInterceptor,
} from "../index";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";

const AdminPanelUser = () => {
  const [loading, setLoading] = useState(true);

  const theme = createTheme();
  const [allUsersList, setAllUsersList] = useState([]);
  const [update, setUpdate] = useState("");

  const token = Cookies.get("access_token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await adminAxiosToDjangoServerInterceptor.get(
          `${BACKEND_BASE_URL}/admin/all-users`,
        );
        setLoading(false);
        setAllUsersList(response.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [update]);

  const handleBlockUser = async (userId) => {
    await onBlockUser(userId, setLoading);
    setAllUsersList((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, is_banned: !user.is_banned };
        }
        return user;
      }),
    );
  };

  if (loading) {
    return <LoadingModal />;
  }
  if (!loading) {
    return (
      <div className="admin_table_container">
        <div className="admin_panel_section_title">
          <span>Users</span>
        </div>
        <div className="admin_panel_search_add">
          <div className="search-container">
            <input
              type="text"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users"
              className="search-input"
            />
          </div>
        </div>
        <ThemeProvider theme={theme}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={allUsersList}
              columns={columns(handleBlockUser, setLoading)}
              pagination
              pageSize={5} // Show only 5 rows per page
              pageSizeOptions={[5, 10, 20]} // Control the options for rows per page
              rowsPerPageOptions={[5, 10, 20]}
            />
          </div>
        </ThemeProvider>
      </div>
    );
  }
};

export default AdminPanelUser;
