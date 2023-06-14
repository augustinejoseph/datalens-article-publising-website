import "./AdminPanelMain.css";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { BACKEND_BASE_URL } from "../../API/Api";

const AdminPanelMain = () => {
  const [allUsersList, setAllUsersList] = useState([]);
  const [update, setUpdata] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}user/all-users`);
        console.log(response);
        setAllUsersList(response.data);

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [update]);

  const onBlockUser = async (userId) => {
    const response = await axios.patch(`${BACKEND_BASE_URL}user/block-user/${userId}`);
    console.log("block user ", response);
    // Update the user's data in the list
    setAllUsersList(prevUsers => prevUsers.map(user => {
      if (user.id === userId) {
        return { ...user, is_active: !user.is_active };
      }
      setUpdata(Math.random(10))
      return user;

    }));
  };

  return (
    <div className="admindash_main_container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            {/* <th>Active</th> */}
            <th>Banned</th>
            <th>Premium</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsersList.length > 0 ? (
            allUsersList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td>{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year:"numeric" }).format(new Date(user.created_at))}</td>
                {/* <td>{user.is_active ? "Yes" : "No"}</td> */}
                <td>{user.is_banned ? "Yes" : "No"}</td>
                <td>{user.is_premium ? "Yes" : "No"}</td>
                <td>{user.is_superuser ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => onBlockUser(user.id)}>
                    {!user.is_banned ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanelMain;
