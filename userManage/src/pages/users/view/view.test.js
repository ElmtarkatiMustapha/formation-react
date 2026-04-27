import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import UserView from ".";

jest.mock("../../../hooks/users/useFetchUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../hooks/alerts/useAlert", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// use import instead of require
const useFetchUser = require("../../../hooks/users/useFetchUser").default;
const useAlert = require("../../../hooks/alerts/useAlert").default;

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

    const { container } = render(
      <MemoryRouter>
        <UserView />
      </MemoryRouter>,
    );

    // get by role
    expect(container.querySelector('input[name="firstName"]').value).toBe(
      "John",
    );
    expect(container.querySelector('input[name="lastName"]').value).toBe("Doe");
    expect(container.querySelector('input[name="email"]').value).toBe(
      "john.doe@example.com",
    );
  });
});
