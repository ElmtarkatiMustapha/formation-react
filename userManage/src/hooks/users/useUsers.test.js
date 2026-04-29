import { renderHook, waitFor } from "@testing-library/react";
import { useSelector } from "react-redux";

import useUsers from "./useUsers";
import { customRenderHook } from "../../utils";
import {
  fetchUsersError,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "../../business/usersReducer/actions";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

jest.mock("../../business/usersReducer/actions", () => ({
  ...jest.requireActual("../../business/usersReducer/actions"),
  fetchUsersRequest: jest.fn(), // () => {}
  fetchUsersSuccess: jest.fn(),
  fetchUsersError: jest.fn(),
}));

describe("useUsers", () => {
  beforeEach(() => {
    useSelector.mockReturnValue({ data: [], loading: true, error: null });
    fetch.mockResolvedValue({ ok: 200, json: () => [] });
    fetchUsersRequest.mockReturnValue({ type: "foo_type" });
    fetchUsersSuccess.mockReturnValue({ type: "foo_type2" });
    fetchUsersError.mockReturnValue({ type: "foo_type2" });
  });

  it("fetch users when it's empty", async () => {
    const expectedUsers = [{ id: 1 }];
    fetch.mockResolvedValue({ ok: 200, json: () => expectedUsers });
    const { result } = customRenderHook(useUsers);

    expect(result.current.loading).toBe(true);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(fetch).toHaveBeenNthCalledWith(1, "http://localhost:8181/api/users");

    expect(fetchUsersRequest).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(fetchUsersSuccess).toHaveBeenCalledTimes(1);
    });

    // expect(fetchUsersSuccess).toHaveBeenNthCalledWith(1, expectedUsers);
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
