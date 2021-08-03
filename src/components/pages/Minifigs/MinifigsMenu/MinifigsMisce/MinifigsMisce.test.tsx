import React from "react";
import { render, screen, fireEvent } from "utils/test";
import MinifigsMisce from "./MinifigsMisce";

test("toggle add minifig modal", () => {
  render(<MinifigsMisce />);
  expect(screen.queryByText("Name")).toBeNull();
  fireEvent.click(screen.getByText("Add a minifig"));
  expect(screen.getByText("Name")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Cancel"));
  expect(screen.queryByText("Name")).not.toBeInTheDocument();
});
