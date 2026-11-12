import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import axios, { AxiosError } from "axios";
import { useFetch } from "@/hooks/useFetch";

describe("useFetch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return loading state while request is pending", () => {
    vi.spyOn(axios, "get").mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useFetch("/api/users"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should return data when API request succeeds", async () => {
    const mockData = [{ id: 1, name: "Shahin" }];

    vi.spyOn(axios, "get").mockResolvedValue({
      data: mockData,
    } as never);

    const { result } = renderHook(() => useFetch("/api/users"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should return error message when request fails", async () => {
    vi.spyOn(axios, "get").mockRejectedValue(
      new Error("Something went wrong"),
    );

    const { result } = renderHook(() => useFetch("/api/users"));

    await waitFor(() => {
      expect(result.current.error).toBe("Something went wrong");
    });

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should handle AxiosError correctly", async () => {
    vi.spyOn(axios, "get").mockRejectedValue(
      new AxiosError("Network Error"),
    );

    const { result } = renderHook(() => useFetch("/api/users"));

    await waitFor(() => {
      expect(result.current.error).toBe("Network Error");
    });

    expect(result.current.loading).toBe(false);
  });

  it("should fetch again when URL changes", async () => {
    const mockData = [{ id: 1, name: "Shahin" }];

    const getSpy = vi.spyOn(axios, "get");
    getSpy
      .mockResolvedValueOnce({ data: mockData } as never)
      .mockResolvedValueOnce({ data: [{ id: 2, name: "Rahaman" }] } as never);

    const { result, rerender } = renderHook(
      ({ url }) => useFetch(url),
      {
        initialProps: { url: "/api/users" },
      },
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    rerender({ url: "/api/posts" });

    await waitFor(() => {
      expect(result.current.data).toEqual([
        { id: 2, name: "Rahaman" },
      ]);
    });

    expect(getSpy).toHaveBeenCalledTimes(2);
    expect(getSpy).toHaveBeenNthCalledWith(1, "/api/users");
    expect(getSpy).toHaveBeenNthCalledWith(2, "/api/posts");
  });
});