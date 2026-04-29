import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormUser from "../../../components/formUser";
import useFetchUser from "../../../hooks/users/useFetchUser";
import useAlert from "../../../hooks/alerts/useAlert";
import useDispatchAction from "../../../hooks/useDispatchAction";
import {
  updateUserError,
  updateUserRequest,
  updateUserSuccess,
} from "../../../business/usersReducer/actions";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { user, loading, error: fetchError } = useFetchUser(id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateUserRequestAction = useDispatchAction(updateUserRequest);
  const updateUserSuccessAction = useDispatchAction(updateUserSuccess);
  const updateUserErrorAction = useDispatchAction(updateUserError);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  useEffect(() => {
    if (fetchError) showAlert(fetchError, "error");
  }, [fetchError, showAlert]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const updateUser = useCallback(async (userId, data) => {
    updateUserRequestAction(); // fetch + loading true

    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // const errorData = await response.json().catch(() => null);
      // throw new Error(errorData?.message || "Failed to update user");
      updateUserErrorAction(errorData?.message || "Failed to update user");
    }

    const updatedUser = await response.json();
    updateUserSuccessAction(updatedUser);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await updateUser(id, formData);
        showAlert("User updated successfully", "success");
        navigate("/users");
      } catch (err) {
        showAlert(err.message || "Unable to submit form", "error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [id, formData, showAlert, navigate, updateUser],
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Edit User</h2>
      <FormUser
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        disabled={isSubmitting}
      />
    </div>
  );
}
