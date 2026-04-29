import { act, renderHook } from "@testing-library/react";
import { ToastProvider } from "../../contexts/ToastContext";
import useAlert from "./useAlert";

describe("useAlert", () => {
  it("should expose a showAlert function", () => {
    const { result } = renderHook(() => useAlert(), { wrapper: ToastProvider });
    expect(typeof result.current.showAlert).toBe("function");
  });

  it("should call showAlert without throwing when invoked", () => {
    const { result } = renderHook(() => useAlert(), { wrapper: ToastProvider });

    act(() => {
      result.current.showAlert("Operation successful", "success");
    });

    expect(typeof result.current.showAlert).toBe("function");
  });
});