import { useNavigate } from "react-router-dom";

// add all tests
export default function FormUser({
  handleSubmit,
  formData,
  handleChange,
  disable,
}) {
  // add here handle changes
  const navigate = useNavigate();

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
      }}
    >
      <div>
        <label>First Name:</label>
        <br />
        <input
          type="text"
          disabled={disable}
          name="firstName"
          value={formData?.firstName}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <br />
        <input
          type="text"
          disabled={disable}
          name="lastName"
          value={formData?.lastName}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div>
        <label>Email:</label>
        <br />
        <input
          type="email"
          disabled={disable}
          name="email"
          value={formData?.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div>
        <label>Phone:</label>
        <br />
        <input
          type="text"
          disabled={disable}
          name="phone"
          value={formData?.phone}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div>
        {!disable && (
          <button type="submit" className="btn-primary">
            Save User
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate("/users")}
          className="btn-danger"
          style={{ marginLeft: "10px" }}
        >
          Go Back
        </button>
      </div>
    </form>
  );
}
