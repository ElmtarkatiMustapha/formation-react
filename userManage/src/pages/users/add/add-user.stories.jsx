import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import UserAdd from ".";
import { ToastProvider } from "../../../contexts/ToastContext";
import { MemoryRouter } from "react-router-dom";

const queryClient = new QueryClient();

const withRouter = (Story) => (
  <MemoryRouter>
    <Story />
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

export default {
  title: "pages/add-user",
  component: UserAdd,
  decorators: [withRouter, withToast, withReactQuery],
};

export const defaultPage = {};
