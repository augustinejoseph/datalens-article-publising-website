import "./AdminPanelCategory.css";
import {
  DataGrid,
  React,
  useEffect,
  useState,
  axios,
  LoadingModal,
  ARTICLE_SERVER_NODE_BASE_URL,
  useToast,
} from "../index";
import {
  handleCategoryDelete,
  columns,
  fetchCategories,
  createCategory,
} from "./functions";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AdminPanelCategory = () => {
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  const theme = createTheme();
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const getRowId = (row, index) => row._id;

  useEffect(() => {
    fetchCategories(setCategories, setLoading);
  }, []);

  const handleCreateCategory = async () => {
    await createCategory(
      newCategoryName,
      setCategories,
      categories,
      setNewCategoryName,
      showToast,
      setLoading,
    );
    setNewCategoryName("");
  };

  return (
    <>
      {loading ? (
        <LoadingModal />
      ) : (
        <div className="admin_table_container">
          <div className="admin_panel_section_title">
            <span>Categories</span>
          </div>
          <div className="admin_panel_search_add">
            <div className="create-category">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="category-input"
              />
              <button onClick={handleCreateCategory} className="create-button">
                Create
              </button>
            </div>
            <div className="search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search category"
                className="search-input"
              />
            </div>
          </div>

          <div className="admin_actual_table">
            <ThemeProvider theme={theme}>
              <div style={{ height: 400, width: "70%" }}>
                <DataGrid
                  rows={categories}
                  columns={columns(handleCategoryDelete, setCategories)}
                  getRowId={(row) => row._id}
                  pagination
                  pageSize={5}
                  pageSizeOptions={[5, 10, 20]}
                  rowsPerPageOptions={[5, 10, 20]}
                />
              </div>
            </ThemeProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanelCategory;
