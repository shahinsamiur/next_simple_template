import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFormErrors } from "@/hooks/useFormErrors";

describe("useFormErrors", () => {
  it("should initialize with empty errors", () => {
    const { result } = renderHook(() => useFormErrors());

    expect(result.current.errors).toEqual({});
  });

  it("should set an error for a single field", () => {
    const { result } = renderHook(() => useFormErrors());

    act(() => {
      result.current.setFieldError("email", "Invalid email");
    });

    expect(result.current.errors).toEqual({
      email: "Invalid email",
    });
  });

  it("should set multiple field errors", () => {
    const { result } = renderHook(() => useFormErrors());

    const errors = {
      email: "Invalid email",
      password: "Password is required",
    };

    act(() => {
      result.current.setMultipleErrors(errors);
    });

    expect(result.current.errors).toEqual(errors);
  });

  it("should clear an error for a specific field", () => {
    const { result } = renderHook(() => useFormErrors());

    act(() => {
      result.current.setMultipleErrors({
        email: "Invalid email",
        password: "Password is required",
      });
    });

    act(() => {
      result.current.clearError("email");
    });

    expect(result.current.errors).toEqual({
      password: "Password is required",
    });
  });

  it("should clear all errors", () => {
    const { result } = renderHook(() => useFormErrors());

    act(() => {
      result.current.setMultipleErrors({
        email: "Invalid email",
        password: "Password is required",
      });
    });

    act(() => {
      result.current.clearAllErrors();
    });

    expect(result.current.errors).toEqual({});
  });
});