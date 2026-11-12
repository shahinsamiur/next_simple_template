import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { createRef } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";

describe("useClickOutside", () => {
  it("should call callback when clicking outside the element", () => {
    const callback = vi.fn();
    const ref = createRef<HTMLDivElement>();

    render(
      <>
        <div ref={ref} data-testid="target">
          Inside Element
        </div>
        <button data-testid="outside">Outside Element</button>

        <TestComponent refObject={ref} callback={callback} />
      </>
    );

    fireEvent.mouseDown(document.querySelector('[data-testid="outside"]')!);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call callback when clicking inside the element", () => {
    const callback = vi.fn();
    const ref = createRef<HTMLDivElement>();

    render(
      <>
        <div ref={ref} data-testid="target">
          Inside Element
        </div>

        <TestComponent refObject={ref} callback={callback} />
      </>
    );

    fireEvent.mouseDown(document.querySelector('[data-testid="target"]')!);

    expect(callback).not.toHaveBeenCalled();
  });

  it("should not call callback when ref is null", () => {
    const callback = vi.fn();
    const ref = createRef<HTMLDivElement>();

    render(<TestComponent refObject={ref} callback={callback} />);

    fireEvent.mouseDown(document.body);

    expect(callback).not.toHaveBeenCalled();
  });

  it("should remove the event listener on unmount", () => {
    const callback = vi.fn();
    const ref = createRef<HTMLDivElement>();

    const { unmount } = render(
      <>
        <div ref={ref}>Inside Element</div>
        <TestComponent refObject={ref} callback={callback} />
      </>
    );

    unmount();

    fireEvent.mouseDown(document.body);

    expect(callback).not.toHaveBeenCalled();
  });
});

function TestComponent({
  refObject,
  callback,
}: {
  refObject: React.RefObject<HTMLDivElement | null>;
  callback: () => void;
}) {
  useClickOutside(refObject, callback);
  return null;
}