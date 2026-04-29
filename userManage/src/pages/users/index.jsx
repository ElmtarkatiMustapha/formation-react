import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Loader from "../../components/loader";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  fetchUsersSuccess,
  fetchUsersError,
  fetchUsersRequest,
} from "../../business/usersReducer/actions";
import useDispatchAction from "../../hooks/useDispatchAction";
import useUsers from "../../hooks/users/useUsers";

export default function UserList() {
  const { users, error, loading } = useUsers();
  const navigate = useNavigate();

  //handle delete user
  const handleDeleteUser = async (id) => {
    // modal de confirmation avant de supprimer un utilisateur
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const isDeleted = await fetch(`http://localhost:8181/api/users/${id}`, {
          method: "DELETE",
        });

        if (isDeleted) {
          fetchUsers();
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  //handle click on the edit button
  const handleEditClick = (id) => {
    navigate(`/users/${id}/edit`);
  };
  //handle click on view button
  const handleViewClick = (id) => {
    navigate(`/users/${id}/view`);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Users</h2>
        <Link
          to="/users/add"
          className="btn-primary"
          style={{ textDecoration: "none" }}
        >
          Add User
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td style={{ display: "flex", gap: "10px" }}>
                <Button
                  label={"View"}
                  name={"view"}
                  color={"btn-primary"}
                  handleClick={() => handleViewClick(user.id)}
                />
                <Button
                  label={"Edit"}
                  name={"edit"}
                  color={"btn-warning"}
                  handleClick={() => handleEditClick(user.id)}
                />
                <Button
                  label={"Delete"}
                  name={"delete"}
                  color={"btn-danger"}
                  handleClick={() => handleDeleteUser(user.id)}
                />
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
