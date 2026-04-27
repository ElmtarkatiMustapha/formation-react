import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from ".";

describe("header", () => {
  it("render header", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // use this
    // screen.getByRole("heading", {level: 3, name: "Welcome!"})
    expect(screen.getByRole("heading").textContent).toBe("Welcome!");
    expect(screen.getByRole("button").textContent).toBe("Disconnect");
  });
});
