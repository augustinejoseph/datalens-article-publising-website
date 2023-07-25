import {Trash2Fill, axios, ARTICLE_SERVER_NODE_BASE_URL, adminAxiosToDjangoServerInterceptor, useToast} from '../index'

const deleteButton = {
    backgroundColor: "red",
    color:"white",
    borderRadius:"10px",
    padding : "0 10px",
    display : 'flex',
    alignItems : 'center',
    // padding:"10px"
}

export const columns = (handleCategoryDelete) => [
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Category", width: 270 },
  {
    field: "actions",
    headerName: "Delete",
    width: 250,
    sortable: false,
    renderCell: (params) => {
      const categoryId = params.row._id;

      const handleCategoryDeleteConfirmation = () => {
        const showToast = useToast()
        handleCategoryDelete(categoryId, showToast);
      };
        return <button style={deleteButton} onClick={handleCategoryDeleteConfirmation}><Trash2Fill />Delete</button>
      
    },
  },
];

  // Delete a category
 export const handleCategoryDelete = async (categoryId) => {
    try {
      const response = await adminAxiosToDjangoServerInterceptor.delete(
        `${ARTICLE_SERVER_NODE_BASE_URL}/admin/category/${categoryId}`
      );
        showToast(response.data.message, response.status)

    } catch (error) {
      showToast(error.data.message, error.status)
      console.error("Error deleting category:", error);
    }
  };


//   Get all categories
export const fetchCategories = async (setCategories, setLoading) => {
  try {
    setLoading(true)
    const response = await axios.get(`${ARTICLE_SERVER_NODE_BASE_URL}/open/all-categories`);
    const categories = response.data.map((category) => ({
      ...category,
      id: category._id, 
    }));
    setLoading(false)
    console.log(response);
    setCategories(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};



// New Category
export const createCategory = async (
  newCategoryName,
  setCategories,
  categories,
  setNewCategoryName,
  showToast,
  setLoading,
) => {
  try {
    setLoading(true)
    const response = await adminAxiosToDjangoServerInterceptor.post(`${ARTICLE_SERVER_NODE_BASE_URL}/admin/category`, {
      name: newCategoryName,
    });
    setLoading(false)
    setNewCategoryName("");
    showToast("Category created successfully", 200);
  } catch (error) {
    setLoading(false)
    if (error.response) {
      const { message, status } = error.response.data;
      showToast(message, "error", status);
    } else if (error.request) {
      showToast("Server not responding", 500);
    } else {
      console.error("Error creating category:", error);
    }
  }
};

