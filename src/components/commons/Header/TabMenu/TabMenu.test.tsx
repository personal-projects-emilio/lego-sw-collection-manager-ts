import React from "react";
import { screen } from "@testing-library/react";
import TabMenu from "./TabMenu";
import { renderWithRouter } from "utils";

test("renders the tab menu", () => {
  renderWithRouter(<TabMenu />, { route: "/minifigs" });
  const authTabElement = screen.getByText(/Authentication/i);
  expect(authTabElement).toBeInTheDocument();
});

test("render the minifigs as selected", () => {
  renderWithRouter(<TabMenu />, { route: "/minifigs" });

  const minifigsTabElement = screen.getByTestId("minifigs");
  expect(minifigsTabElement).toHaveAttribute("aria-selected", "true");
});
