import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Button from ".";

describe("button test", () => {
  it("render correctly", () => {
    const handleClick = jest.fn();
    render(
      <MemoryRouter>
        <Button
          label={"View"}
          name={"view"}
          color={"btn-primary"}
          handleClick={handleClick}
        />
      </MemoryRouter>,
    );
    expect(screen.getByRole("button").textContent).toBe("View");

    // add test on handleClick
    // get the button
    // click on it
    // check if we called the handleClick
  });
});
