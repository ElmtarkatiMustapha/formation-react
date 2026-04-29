import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render, renderHook } from "@testing-library/react";

import store from "../business/store";

export const customRender = (ui) =>
  render(
    <MemoryRouter>
      <Provider store={store}>{ui}</Provider>
    </MemoryRouter>,
  );

export const customRenderHook = (useHook) =>
  renderHook(useHook, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    ),
  });
