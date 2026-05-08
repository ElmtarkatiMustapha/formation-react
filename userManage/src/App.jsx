import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import "./App.css";
import { UsersRoutes } from "./pages/users/users.routes";
import Header from "./components/header";
import { ToastProvider } from "./contexts/ToastContext";
import store from "./business/store";

// create folder per page and move components related to that page in the folder

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users/*" element={<UsersRoutes />} />
          </Routes>
        </ToastProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
