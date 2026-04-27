import { render, screen } from "@testing-library/react";

import Alert from "./Alert";

describe("alerts toast", () => {
  const closeAlert = jest.fn();
  const renderAlert = () =>
    render(
      <Alert message={"Test alert"} type={"success"} onClose={closeAlert} />,
    );
  it("render alert", () => {
    const { container } = renderAlert();

    expect(screen.getByRole("paragraph").textContent).toBe("Test alert");

    screen.getByRole("button").click();
    expect(closeAlert).toHaveBeenCalledTimes(1);
    // expect(container.textContent).toBe('Test alert')
  });
});
