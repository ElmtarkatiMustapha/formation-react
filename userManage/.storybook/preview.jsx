import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { ToastProvider } from "../src/contexts/ToastContext";
import store from "../src/business/store";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

const queryClient = new QueryClient();

const withRouter = (Story, context) => {
  const {
    parameters: { path, pathname },
  } = context;
  return (
    <MemoryRouter initialEntries={[path || ""]}>
      <Routes>
        <Route path={pathname || ""} element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

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

export const decorators = [withStore, withRouter, withToast, withReactQuery];

export default preview;
