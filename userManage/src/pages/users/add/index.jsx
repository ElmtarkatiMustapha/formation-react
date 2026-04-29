import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormUser from "../../../components/formUser";
import Loader from "../../../components/loader";
import useAlert from "../../../hooks/alerts/useAlert";
import useUsers from "../../../hooks/users/useUsers";
import useUser from "../../../hooks/users/useUser";

export default function UserAdd() {
  const { showAlert } = useAlert();
  const { addUser } = useUser();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addUser(formData)) {
      showAlert("User added successfully", "success");
      navigate("/users");
    } else showAlert(error.message || "An error occurred", "error");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="container">
      <h2>Add User</h2>
      <FormUser
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        disable={false}
      />
    </div>
  );
}
