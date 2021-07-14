import React from "react";
import { screen } from "@testing-library/react";
import TabMenu from "./TabMenu";
import { render } from "utils/test";

test("renders the tab menu", () => {
  render(<TabMenu />, {}, { route: "/minifigs" });
  const authTabElement = screen.getByText(/Authentication/i);
  expect(authTabElement).toBeInTheDocument();
});

test("render the minifigs as selected", () => {
  render(<TabMenu />, {}, { route: "/minifigs" });

  const minifigsTabElement = screen.getByTestId("minifigs");
  expect(minifigsTabElement).toHaveAttribute("aria-selected", "true");
});
