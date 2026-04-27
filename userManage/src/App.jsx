import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { UsersRoutes } from "./pages/users/users.routes";
import Header from "./components/header";
import { ToastProvider } from "./contexts/ToastContext";
import { Provider } from "react-redux";
import store from "./business/store";

// create folder per page and move components related to that page in the folder

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users/*" element={<UsersRoutes />} />
        </Routes>
      </ToastProvider>
    </Provider>
  );
}

export default App;
