import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormUser from "../components/FormUser";

export function UserEdit() {
  // load user data from backend and fill the form with the data
  // add loading state and error state to display a loader and error notification to the user
  // disable the submit button while the form is submitting to prevent multiple submissions

  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${id}`);
      if (response.ok) {
        const { firstName, lastName, email, phone } = await response.json();
        setFormData({
          firstName,
          lastName,
          email,
          phone,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8181/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/users");
      } else {
        const error = await response.json();
        alert(error.message || "Error occurred");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      <FormUser
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        disable={false}
      />
    </div>
  );
}
