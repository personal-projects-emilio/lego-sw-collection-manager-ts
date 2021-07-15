import React from "react";
import Routes from "./Routes";
import { render, screen } from "utils/test";

test("render minifig route", () => {
  render(<Routes />);
  const loadingElement = screen.getByText(/loading/i);
  expect(loadingElement).toBeInTheDocument();
});

test("render the auth route", () => {
  render(<Routes />, { route: "/auth" });

  const authElement = screen.getByText(/auth/i);
  expect(authElement).toBeInTheDocument();
});
