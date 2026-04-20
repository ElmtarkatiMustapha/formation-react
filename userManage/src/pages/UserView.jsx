import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormUser from "../components/FormUser";

export default function UserView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // create hook useUser to fetch user data and return user data, loading state and error state
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8181/api/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = (e) => {};
  const handleChange = (e) => {};

  if (!user) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>User Details</h2>
      <FormUser
        handleSubmit={handleSubmit}
        formData={user}
        handleChange={handleChange}
        disable={true}
      />
    </div>
  );
}
