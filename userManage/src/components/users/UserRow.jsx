// add tests
export function UserRow({ user, handleShowUserDetails, handleDeleteUser }) {
  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <button
          onClick={() => handleShowUserDetails(user.id)}
          className="btn-primary"
        >
          View
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDeleteUser(user.id)}
          className="btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
