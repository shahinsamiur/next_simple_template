import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return initial value when localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("username", "Shahin"),
    );

    expect(result.current[0]).toBe("Shahin");
  });

  it("should return stored value from localStorage", () => {
    localStorage.setItem("username", JSON.stringify("Rahaman"));

    const { result } = renderHook(() =>
      useLocalStorage("username", "Shahin"),
    );

    expect(result.current[0]).toBe("Rahaman");
  });

  it("should update localStorage when state changes", () => {
    const { result } = renderHook(() =>
      useLocalStorage("username", "Shahin"),
    );

    act(() => {
      result.current[1]("Updated User");
    });

    expect(result.current[0]).toBe("Updated User");
    expect(localStorage.getItem("username")).toBe(
      JSON.stringify("Updated User"),
    );
  });

  it("should support complex data types", () => {
    const initialValue = {
      name: "Shahin",
      skills: ["React", "Next.js"],
    };

    const { result } = renderHook(() =>
      useLocalStorage("user", initialValue),
    );

    expect(result.current[0]).toEqual(initialValue);

    expect(JSON.parse(localStorage.getItem("user")!)).toEqual(
      initialValue,
    );
  });
});