
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "./Header";
import { HEADER_CONFIG, NAV_LINKS } from "@/mocks/nav";

describe("Header", () => {
  it("should render the brand name", () => {
    render(<Header />);

    expect(
      screen.getByText(HEADER_CONFIG.brand.name)
    ).toBeInTheDocument();
  });

  it("should render all navigation links", () => {
    render(<Header />);

    NAV_LINKS.forEach((link) => {
      expect(
        screen.getAllByRole("link", { name: link.name }).length
      ).toBeGreaterThan(0);
    });
  });

  it("should render the CTA link", () => {
    render(<Header />);

    expect(
      screen.getAllByRole("link", {
        name: HEADER_CONFIG.cta.label,
      }).length
    ).toBeGreaterThan(0);
  });

  it("should open the mobile navigation menu", async () => {
    const user = userEvent.setup();

    render(<Header />);

    await user.click(
      screen.getByRole("button", {
        name: HEADER_CONFIG.menu.openLabel,
      })
    );

expect(
  document.getElementById("mobile-navigation")
).toBeInTheDocument();
  });

  it("should close the mobile navigation menu", async () => {
    const user = userEvent.setup();

    render(<Header />);

    await user.click(
      screen.getByRole("button", {
        name: HEADER_CONFIG.menu.openLabel,
      })
    );

    await user.click(
      screen.getByRole("button", {
        name: HEADER_CONFIG.menu.closeLabel,
      })
    );

    expect(
      screen.queryByRole("button", {
        name: HEADER_CONFIG.menu.closeLabel,
      })
    ).not.toBeInTheDocument();
  });

  it("should close the mobile menu after clicking a navigation link", async () => {
    const user = userEvent.setup();

    render(<Header />);

    await user.click(
      screen.getByRole("button", {
        name: HEADER_CONFIG.menu.openLabel,
      })
    );

    const mobileMenu = document.getElementById("mobile-navigation");

    await user.click(
      within(mobileMenu!).getByRole("link", {
        name: NAV_LINKS[1].name,
      })
    );

    expect(
      screen.getByRole("button", {
        name: HEADER_CONFIG.menu.openLabel,
      })
    ).toBeInTheDocument();
  });
});
