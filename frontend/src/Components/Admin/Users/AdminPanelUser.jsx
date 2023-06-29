
import { BACKEND_BASE_URL } from "../../../API/Api";
import { columns, onBlockUser } from './functions';
import { DataGrid, React, useEffect, useState, axios} from "../index";


const AdminPanelUser = () => {
  const [allUsersList, setAllUsersList] = useState([]);
  const [update, setUpdate] = useState("");
  console.log(allUsersList);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}user/all-users`);
        setAllUsersList(response.data);
        console.log("all users list",allUsersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [update]);

  const handleBlockUser = async (userId) => {
    await onBlockUser(userId);
    setAllUsersList((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, is_banned: !user.is_banned };
        }
        return user;
      })
    );
  };

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

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={allUsersList}
          columns={columns(handleBlockUser)}
          pagination
          pageSize={5} // Show only 5 rows per page
          pageSizeOptions={[5, 10, 20]} // Control the options for rows per page
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </div>
  );
};

export default AdminPanelUser;
