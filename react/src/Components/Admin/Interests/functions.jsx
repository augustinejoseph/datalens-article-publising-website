import { BACKEND_BASE_URL, adminAxiosToDjangoServerInterceptor } from "../index";
const deleteButton = {
  backgroundColor: "red",
  color:"white",
  borderRadius:"10px",
  padding : "0 10px",
  display : 'flex',
  alignItems : 'center',
}
export const columns = (handleInterestDelete, showToast, fetchInterests, Trash2Fill) => [
  { field: "id", headerName: "ID", width: 300 },
  { field: "interestName", headerName: "Interest", width: 270 },
  {
    field: "actions",
    headerName: "Delete",
    width: 250,
    sortable: false,
    renderCell :(params) => {
        const interestName = params.row.interestName;
        const handleDelete = () => {
            handleInterestDelete(interestName, showToast, fetchInterests);
        };
    

      return <button style={deleteButton} onClick={handleDelete}><Trash2Fill />Delete</button>
    
    }
  },
]


export const handleInterestDelete = async (interestName, showToast, fetchInterests) => {
  try {
    const response = await adminAxiosToDjangoServerInterceptor.delete(`${BACKEND_BASE_URL}/admin/delete-interest/${interestName}`);
    showToast("Interest deleted successfully", response.status);
    fetchInterests();
  } catch (error) {
    showToast("Error deleting interest", error.response ? error.response.status : 500);
    console.log('interest deletion error', error);
  }
};
