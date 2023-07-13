import axios from "axios";
import { BACKEND_BASE_URL } from "../../index";

const blockedButtonStyle = {
    backgroundColor: "red",
    color:"white",
    borderRadius:"10px",
    padding : "0 10px"
}

const unblockButtonStyle = {
    backgroundColor: "green",
    color:"white",
    borderRadius:"10px",
    padding : "0 10px"
}

export const columns = (handleBlockUser) => [
  { field: "id", headerName: "ID", width: 100 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "user_name", headerName: "Username", width: 150 },
  { field: "first_name", headerName: "First Name", width: 150 },
  { field: "is_banned", headerName: "Banned", width: 150 },
  { field: "is_premium", headerName: "Premium", width: 170 },
  { field: "is_active", headerName: "Email Verified", width: 170 , },
  {
    field: "actions",
    headerName: "Block",
    width: 150,
    sortable: false,
    renderCell: (params) => {
      const userId = params.row.id;
      const isUserBlocked = params.row.is_banned;

      const handleBlockUserClick = () => {
        handleBlockUser(userId);
      };

      if (isUserBlocked) {
        return <button style={unblockButtonStyle} onClick={handleBlockUserClick}>Unblock</button>;
      } else {
        return <button style={blockedButtonStyle} onClick={handleBlockUserClick}>Block</button>
      }
    },
  },
];


export const onBlockUser = async (userId) => {
    if (!userId) {
      console.error("Invalid userId");
      return;
    }
  
    const formattedUserId = String(userId);
    console.log(formattedUserId, "user id in block fn for user");
  
    const response = await axios.put(
      `${BACKEND_BASE_URL}user/block-user/${userId}`
    );
    console.log("block user ", response);
  };
  