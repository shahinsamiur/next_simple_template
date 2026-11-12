import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Footer from "./Footer";
import { FOOTER_CONFIG, FOOTER_COLUMNS } from "@/mocks/footer";

describe("Footer", () => {
  it("should render the brand name", () => {
    render(<Footer />);

    expect(
      screen.getByText(FOOTER_CONFIG.brand.name, {
        selector: "p:not([aria-hidden='true'])",
      }),
    ).toBeInTheDocument();
  });

  it("should render the brand tagline", () => {
    render(<Footer />);

    expect(screen.getByText(FOOTER_CONFIG.brand.tagline)).toBeInTheDocument();
  });

  it("should render all footer columns", () => {
    render(<Footer />);

    FOOTER_COLUMNS.forEach((column) => {
      expect(screen.getByText(column.title)).toBeInTheDocument();
    });
  });

  it("should render all footer links", () => {
    render(<Footer />);

    FOOTER_COLUMNS.forEach((column) => {
      column.links.forEach((link) => {
        expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
          "href",
          link.href,
        );
      });
    });
  });

  it("should render the watermark", () => {
    render(<Footer />);

    expect(
      screen.getByText(FOOTER_CONFIG.watermark, {
        selector: "p[aria-hidden='true']",
      }),
    ).toBeInTheDocument();
  });
});
