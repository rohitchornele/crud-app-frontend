import React, { useEffect, useState } from "react";
import "./user.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      // console.log(response);
      setUsers(response.data);
    }

    fetchUsers();
  }, []);

  const deleteUser =  async (userId) => {
    await axios.delete(`http://localhost:8000/api/delete/${userId}`).then ((response) => {
      setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      toast.success(response.data.msg, {position: "top-right"});
      // console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }


  return (
    <div className="user-table">
      <Link to={"/add"} className="btn-add">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={1}>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { users.map( (user, index) => {
            return (
              <tr key={user._id}>
                <td>{index +1}</td>
                <td>{user.fName + " "}{user.lName}</td>
                <td>{user.email}</td>
                <td className="action-buttons">
                  <button onClick={()=> deleteUser(user._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link to={`/edit/` + user._id}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default User;
