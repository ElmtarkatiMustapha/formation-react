export default function Modal({ user, onClose }) {
  return (
    <div className='modal'>
        <div className='modal-content'>
            <div className="modal-header">
                <div className="left">
                    <h3>User Details</h3>
                </div>
                <div className="right">
                    <button className='btn-danger' onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
            <table>
                <tr>
                    <th>First Name:</th>
                    <td>{user.firstName}</td>
                </tr>
                <tr>
                    <th>Last Name:</th>
                    <td>{user.lastName}</td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <th>Phone:</th>
                    <td>{user.phone}</td>
                </tr>
            </table>
        </div>
    </div>
  )
}