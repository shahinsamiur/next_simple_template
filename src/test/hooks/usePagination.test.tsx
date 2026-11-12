import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { usePagination } from "@/hooks/usePagination";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe("usePagination", () => {
  it("should initialize with the first page", () => {
    const { result } = renderHook(() =>
      usePagination({ data, itemsPerPage: 3 })
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(4);
    expect(result.current.paginatedData).toEqual([1, 2, 3]);
  });

  it("should move to the next page", () => {
    const { result } = renderHook(() =>
      usePagination({ data, itemsPerPage: 3 })
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData).toEqual([4, 5, 6]);
  });

  it("should move to the previous page", () => {
    const { result } = renderHook(() =>
      usePagination({ data, itemsPerPage: 3 })
    );

    act(() => {
      result.current.goToPage(3);
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  it("should not exceed the last page", () => {
    const { result } = renderHook(() =>
      usePagination({ data, itemsPerPage: 3 })
    );

    act(() => {
      result.current.goToPage(4);
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(4);
  });

  it("should clamp the requested page within valid boundaries", () => {
    const { result } = renderHook(() =>
      usePagination({ data, itemsPerPage: 3 })
    );

    act(() => {
      result.current.goToPage(10);
    });

    expect(result.current.currentPage).toBe(4);

    act(() => {
      result.current.goToPage(0);
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("should handle empty data without moving to page zero", () => {
    const { result } = renderHook(() =>
      usePagination({ data: [], itemsPerPage: 3 })
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.paginatedData).toEqual([]);
  });
});