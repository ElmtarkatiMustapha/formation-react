import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormUser from "../components/FormUser";

export default function UserAdd() {
  // add loading state and error state to display a loader and error notification to the user
  // disable the submit button while the form is submitting to prevent multiple submissions
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
    try {
      const response = await fetch("http://localhost:8181/api/users", {
        method: "POST",
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
      console.error("Error adding user:", error);
    }
  };

  return (
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
