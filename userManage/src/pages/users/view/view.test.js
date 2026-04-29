import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserView from ".";
import useFetchUser from "../../../hooks/users/useFetchUser";
import useAlert from "../../../hooks/alerts/useAlert";

jest.mock("../../../hooks/users/useFetchUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../hooks/alerts/useAlert", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("UserView", () => {
  const mockedShowAlert = jest.fn();

  beforeEach(() => {
    mockedShowAlert.mockClear();
    useAlert.mockReturnValue({ showAlert: mockedShowAlert });
  });

  it("renders without crashing", () => {
    const mockUser = {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "Admin",
    };

    useFetchUser.mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <UserView />
      </MemoryRouter>,
    );

    const [firstNameInput, lastNameInput, emailInput] = screen.getAllByRole("textbox");

    expect(firstNameInput.value).toBe("John");
    expect(lastNameInput.value).toBe("Doe");
    expect(emailInput.value).toBe("john.doe@example.com");
  });
});
