import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useToggle } from "@/hooks/useToggle";

describe("useToggle", () => {
  it("should initialize with false by default", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.state).toBe(false);
  });

  it("should accept a custom initial value", () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.state).toBe(true);
  });

  it("should toggle the state", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.state).toBe(true);
  });

  it("should toggle the state multiple times", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.toggle();
      result.current.toggle();
    });

    expect(result.current.state).toBe(false);
  });

  it("should update state using setState", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.setState(true);
    });

    expect(result.current.state).toBe(true);
  });
});