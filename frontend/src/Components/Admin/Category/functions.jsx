import {Trash2Fill, axios, ARTICLE_SERVER_NODE_BASE_URL} from '../index'

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
    // { field: "serialNumber", headerName: "No." },
    { field: "_id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Category", width: 270 },
  {
    field: "actions",
    headerName: "Delete",
    width: 250,
    sortable: false,
    renderCell: (params) => {
      const categoryId = params.row._id;

      const handleCategoryDeleteConfirmation = () => {
        handleCategoryDelete(categoryId);
      };
        return <button style={deleteButton} onClick={handleCategoryDeleteConfirmation}><Trash2Fill />Delete</button>
      
    },
  },
];

  // Delete a category
 export const handleCategoryDelete = async (categoryId) => {
    try {
      await axios.delete(
        `${ARTICLE_SERVER_NODE_BASE_URL}category/${categoryId}`
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };


//   Get all categories
export  const fetchCategories = async (setCategories) => {
    try {
      const response = await axios.get(
        `${ARTICLE_SERVER_NODE_BASE_URL}category`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };



// Create Category
export const createCategory = async (newCategoryName, setCategories, categories) => {
    const lowercaseName = newCategoryName.toLowerCase();
  
    const existingCategory = categories.find(
      (category) => category.name.toLowerCase() === lowercaseName
    );
  
    if (existingCategory) {
      alert("Category already exists");
      return;
    }
  
    try {
      const response = await axios.post(
        `${ARTICLE_SERVER_NODE_BASE_URL}category`,
        {
          name: lowercaseName,
        }
      );
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };
  