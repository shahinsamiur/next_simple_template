import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  CounterProvider,
  useCounter,
} from "@/state/context/CounterContext";

function TestComponent() {
  const { count, increment, decrement } = useCounter();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

describe("CounterContext Integration", () => {
  it("should render initial count", () => {
    render(
      <CounterProvider>
        <TestComponent />
      </CounterProvider>,
    );

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("should increment count when clicking increment", () => {
    render(
      <CounterProvider>
        <TestComponent />
      </CounterProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Increment" }));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("should decrement count when clicking decrement", () => {
    render(
      <CounterProvider>
        <TestComponent />
      </CounterProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));

    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });

  it("should update count across multiple actions", () => {
    render(
      <CounterProvider>
        <TestComponent />
      </CounterProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("should throw an error when used outside CounterProvider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useCounter must be used within CounterProvider",
    );
  });
});