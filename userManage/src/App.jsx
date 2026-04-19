import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import UserList from './pages/UserList'
import UserAdd from './pages/UserAdd'
import UserEdit from './pages/UserEdit'
import UserView from './pages/UserView'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/add" element={<UserAdd />} />
        <Route path="/users/:id/edit" element={<UserEdit />} />
        <Route path="/users/:id/view" element={<UserView />} />
      </Routes>
    </>
  )
}

export default App
