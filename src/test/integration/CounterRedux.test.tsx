import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";

import counterReducer, {
  increment,
  decrement,
  incrementByAmount,
} from "@/state/redux/slices/counterSlice";

import type { RootState } from "@/state/redux/store";

function createTestStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
}

function TestComponent() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <p>Count: {count}</p>

      <button onClick={() => dispatch(increment())}>Increment</button>

      <button onClick={() => dispatch(decrement())}>Decrement</button>

      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment By 5
      </button>
    </div>
  );
}

describe("CounterRedux Integration", () => {
  it("should render initial count", () => {
    const testStore = createTestStore();

    render(
      <Provider store={testStore}>
        <TestComponent />
      </Provider>,
    );

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("should increment count", () => {
    const testStore = createTestStore();

    render(
      <Provider store={testStore}>
        <TestComponent />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Increment" }));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("should decrement count", () => {
    const testStore = createTestStore();

    render(
      <Provider store={testStore}>
        <TestComponent />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));

    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });

  it("should increment count by a specific amount", () => {
    const testStore = createTestStore();

    render(
      <Provider store={testStore}>
        <TestComponent />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Increment By 5" }));

    expect(screen.getByText("Count: 5")).toBeInTheDocument();
  });

  it("should update UI after multiple Redux actions", () => {
    const testStore = createTestStore();

    render(
      <Provider store={testStore}>
        <TestComponent />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    fireEvent.click(screen.getByRole("button", { name: "Increment By 5" }));
    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));

    expect(screen.getByText("Count: 5")).toBeInTheDocument();
  });
});