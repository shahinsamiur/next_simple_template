import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsMounted } from "@/hooks/useMounted";

describe("useIsMounted", () => {
  it("should return true after component mounts", () => {
    const { result } = renderHook(() => useIsMounted());

    expect(result.current()).toBe(true);
  });

  it("should return false after component unmounts", () => {
    const { result, unmount } = renderHook(() => useIsMounted());

    unmount();

    expect(result.current()).toBe(false);
  });

  it("should return a stable callback reference", () => {
    const { result, rerender } = renderHook(() => useIsMounted());

    const initialCallback = result.current;

    rerender();

    expect(result.current).toBe(initialCallback);
  });
});