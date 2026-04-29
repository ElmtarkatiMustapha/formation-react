import { renderHook } from "@testing-library/react";

import useUsers from "./useUsers";
import { customRenderHook } from "../../utils";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("useUsers", () => {
  beforeEach(() => {
    useSelector.mockReturnValue({ data: [], loading: true, error: null });
    fetch.mockResolvedValue({ ok: 200, json: () => [] });
  });

  it("render correctly", () => {
    const { result } = customRenderHook(useUsers);

    expect(result.current.loading).toBe(true);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(fetch).toHaveBeenNthCalledWith(1, "http://localhost:8181/api/users");
    // toEqual => deep equality
    // toBe => ref, str, number
  });

  it("don't fetch when users are already fetched", () => {
    const expectedUsers = [{ id: 1 }];
    useSelector.mockReturnValue({
      data: expectedUsers,
      loading: false,
      error: null,
    });

    const { result } = customRenderHook(useUsers);

    expect(result.current.users).toEqual(expectedUsers);
    expect(fetch).toHaveBeenCalledTimes(0);
  });
});
