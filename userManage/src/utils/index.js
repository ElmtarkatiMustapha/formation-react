import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import store from "../business/store";

export const customRender = (ui) =>
  render(
    <MemoryRouter>
      <Provider store={store}>{ui}</Provider>
    </MemoryRouter>,
  );
