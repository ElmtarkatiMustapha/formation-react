import { act, renderHook, waitFor } from "@testing-library/react";

import useFetchUser from "./useFetchUser";

describe("useUser", () => {
  const fetch = jest.fn();
  beforeEach(() => {
    globalThis.fetch = fetch;
  });

  it("fetch error", async () => {
    fetch.mockRejectedValue(new Error("fetching error"));
    const { result, rerender } = renderHook(() => useFetchUser(1));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("fetching error");
    expect(fetch).toHaveBeenNthCalledWith(1, "/api/users/1");
  });

  it("fetch success", async () => {
    const expectedUser = { firstName: "foo", lastName: "bar" };
    fetch.mockResolvedValue({ ok: 200, json: () => expectedUser });
    const { result, rerender } = renderHook(() => useFetchUser(1));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(null);
    expect(result.current.user).toBe(expectedUser);
    expect(fetch).toHaveBeenNthCalledWith(1, "/api/users/1");
  });
});
