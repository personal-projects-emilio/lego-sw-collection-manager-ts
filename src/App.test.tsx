import React from "react";
import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithMemoryRouter } from "./utils";

test("renders the header", () => {
  renderWithMemoryRouter(<App />);
  const headerElement = screen.getByText(/header/i);
  expect(headerElement).toBeInTheDocument();
});
