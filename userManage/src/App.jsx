import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import UserList from "./pages/users";
import UserAdd from "./pages/UserAdd";
import { UserEdit } from "./pages/UserEdit";
import UserView from "./pages/UserView";

// create folder per page and move components related to that page in the folder

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users">
          <Route index element={<UserList />} />
          <Route path="add" element={<UserAdd />} />
          <Route path=":id/edit" element={<UserEdit />} />
          <Route path=":id/view" element={<UserView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
