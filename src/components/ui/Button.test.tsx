
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./Button";

describe("Button", () => {
  it("should render the button", () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole("button")
    ).toBeInTheDocument();
  });

  it("should render children correctly", () => {
    render(<Button>Submit</Button>);

    expect(
      screen.getByRole("button", { name: "Submit" })
    ).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    await user.click(screen.getByRole("button"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should forward native button props", () => {
    render(
      <Button type="submit" aria-label="Submit form">
        Submit
      </Button>
    );

    expect(
      screen.getByRole("button", { name: "Submit form" })
    ).toHaveAttribute("type", "submit");
  });
});
