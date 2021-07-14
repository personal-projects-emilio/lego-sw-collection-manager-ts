import React from "react";
import { screen } from "@testing-library/react";
import App from "./App";
import { render } from "utils/test";

test("renders the header", () => {
  render(<App />);
  const headerElement = screen.getByText(/lego sw/i);
  expect(headerElement).toBeInTheDocument();
});
