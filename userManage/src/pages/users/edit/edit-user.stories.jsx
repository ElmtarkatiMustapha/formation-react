import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import EditUser from ".";
import { ToastProvider } from "../../../contexts/ToastContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../business/store";

const queryClient = new QueryClient();

const withRouter = (Story) => (
  <MemoryRouter initialEntries={["/users/1"]}>
    <Routes>
      <Route path="/users/:id" element={<Story />} />
    </Routes>
  </MemoryRouter>
);

const withToast = (Story) => (
  <ToastProvider>
    <Story />
  </ToastProvider>
);

const withReactQuery = (Story) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

const withStore = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

export default {
  title: "pages/edit-user",
  component: EditUser,
  decorators: [withStore, withRouter, withToast, withReactQuery],
};

export const withSuccess = {};

export const withError = {};
