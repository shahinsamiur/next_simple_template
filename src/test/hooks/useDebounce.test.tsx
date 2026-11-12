import { describe, it, expect, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useDebounce } from "@/hooks/useDebounce";

describe("useDebounce", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));

    expect(result.current).toBe("hello");
  });

  it("should not update before the delay", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "hello" } }
    );

    rerender({ value: "world" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("hello");
  });

  it("should update after the delay", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "hello" } }
    );

    rerender({ value: "world" });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("world");
  });

  it("should cancel the previous timer when value changes", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "hello" } }
    );

    rerender({ value: "world" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender({ value: "next" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("hello");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("next");
  });
});