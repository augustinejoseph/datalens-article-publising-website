import {
  LoadingModal,
  Trash2Fill,
  Search,
  DataGrid,
  useToast,
  useState,
  useEffect,
  BACKEND_BASE_URL,
  adminAxiosToDjangoServerInterceptor,
} from "../index";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { columns, handleInterestDelete } from "./functions";
const AdminPanelInterests = () => {
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  const theme = createTheme();
  const [newInterestName, setNewInterestName] = useState("");
  const [allInterests, setAllInterests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    try {
      setLoading(true);

      const response = await adminAxiosToDjangoServerInterceptor.get(
        `${BACKEND_BASE_URL}/admin/all-interests`,
      );
      setAllInterests(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleInterestCreation = async () => {
    setLoading(true);
    try {
      const response = await adminAxiosToDjangoServerInterceptor.post(
        `${BACKEND_BASE_URL}/admin/new-interest`,
        {
          interestName: newInterestName,
        },
      );
      fetchInterests();
      setLoading(false);
      setNewInterestName("");
      showToast(response.data.message, response.status);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        showToast("Interest already exists", error.response.status);
      } else if (error.response && error.response.status === 400) {
        showToast("Interest field empty", error.response.status);
      } else {
        showToast("Internal server error!", 500);
      }
    }
  };
  if (loading) {
    return <LoadingModal />;
  }
  if (!loading) {
    return (
      <div className="admin_table_container">
        <div className="admin_panel_section_title">
          <span>User Interests</span>
        </div>
        <div className="admin_panel_search_add">
          <div className="create-category">
            <input
              type="text"
              value={newInterestName}
              onChange={(e) => setNewInterestName(e.target.value)}
              placeholder="Enter interest name"
              className="category-input"
            />
            <button onClick={handleInterestCreation} className="create-button">
              Create
            </button>
          </div>
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search interest"
              className="search-input"
            />
            <>
              <Search />{" "}
            </>
          </div>
        </div>

        <div className="admin_actual_table">
          <ThemeProvider theme={theme}>
            <div style={{ height: 400, width: "70%" }}>
              <DataGrid
                rows={allInterests}
                columns={columns(
                  handleInterestDelete,
                  showToast,
                  fetchInterests,
                  Trash2Fill,
                )}
                //   getRowId={(row) => row._id}
                pagination
                pageSize={5}
                pageSizeOptions={[5, 10, 20]}
                rowsPerPageOptions={[5, 10, 20]}
              />
            </div>
          </ThemeProvider>
        </div>
      </div>
    );
  }
};

export default AdminPanelInterests;
