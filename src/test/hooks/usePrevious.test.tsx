import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePrevious } from "@/hooks/usePrevious";

describe("usePrevious", () => {
  it("should return undefined on initial render", () => {
    const { result } = renderHook(() => usePrevious("first"));

    expect(result.current).toBeUndefined();
  });

  it("should return the previous value after value changes", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "first" },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: "second" });

    expect(result.current).toBe("first");

    rerender({ value: "third" });

    expect(result.current).toBe("second");
  });

  it("should keep the previous value when the current value does not change", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "first" },
    });

    rerender({ value: "first" });

    expect(result.current).toBe("first");
  });
});
