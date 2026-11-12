import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "./Input";

describe("Input", () => {
  it("should render the input", () => {
    render(<Input />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should render the placeholder", () => {
    render(<Input placeholder="Enter your name" />);

    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("should accept user input", async () => {
    const user = userEvent.setup();

    render(<Input placeholder="Enter your name" />);

    const input = screen.getByPlaceholderText("Enter your name");

    await user.type(input, "Shahin");

    expect(input).toHaveValue("Shahin");
  });

  it("should call onChange when user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input onChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "Hello");

    expect(handleChange).toHaveBeenCalled();
  });

  it("should be disabled when disabled prop is passed", () => {
    render(<Input disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("should support required attribute", () => {
    render(<Input required />);

    expect(screen.getByRole("textbox")).toBeRequired();
  });

  it("should support custom input type", () => {
    render(<Input type="password" aria-label="Password" />);

    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
  });
});
