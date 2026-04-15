import { useState } from 'react'

import './App.css'
import { UserRow } from './components/UserRow'
import Header from './components/Header'
import Modal from './components/Modal'

function App() {
  const [users,setUsers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '098-765-4321'
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      phone: '555-123-4567'
    },
  ])
  const [openModal, setOpenModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleShowUserDetails = (userId) => {
    const user = users.find(u => u.id === userId)
    setSelectedUser(user)
    setOpenModal(true)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId))
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedUser(null)
  }

  return (
    <>
      <Header />
      <div className='container'>
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <UserRow key={user.id} user={user} handleShowUserDetails={handleShowUserDetails} handleDeleteUser={handleDeleteUser} />
              ))}
            </tbody>
          </table>
      </div>
      {openModal && selectedUser && (
        <Modal user={selectedUser} onClose={handleCloseModal} />
      )}
    </>
  )
}

export default App
