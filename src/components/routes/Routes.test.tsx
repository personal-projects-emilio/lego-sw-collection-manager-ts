import React from "react";
import Routes from "./Routes";
import { render, screen } from "utils/test";

test("render minifig route", () => {
  render(<Routes />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("render the auth route", () => {
  render(<Routes />, { route: "/auth" });
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});
