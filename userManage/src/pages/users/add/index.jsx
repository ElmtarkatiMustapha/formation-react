import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormUser from "../../../components/formUser";
import Loader from "../../../components/loader";
import useAlert from "../../../hooks/alerts/useAlert";


export default function UserAdd() {
  const { showAlert } = useAlert();

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
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8181/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        showAlert("User added successfully", "success");
        navigate("/users");
      } else {
        const errorData = await response.json();
        showAlert(errorData.message || "Error occurred", "error");
      }
    } catch (error) {
      showAlert(error.message || "An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? 
      <Loader /> 
    :
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
