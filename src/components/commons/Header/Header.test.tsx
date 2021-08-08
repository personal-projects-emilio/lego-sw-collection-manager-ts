import React from "react";
import produce from "immer";
import Header from "./Header";
import { render, fireEvent, screen, initialStoreMocked } from "utils/test";

test("render the header and logout", () => {
  const preloadedState = produce(initialStoreMocked, (draft) => {
    draft.auth.token = "authenticated";
  });

  render(<Header />, {
    route: "/minifigs",
    preloadedState,
  });
  expect(window.location.pathname).toBe("/minifigs");
  const logoutTabElement = screen.getByText(/Logout/i);
  expect(logoutTabElement).toBeInTheDocument();
  fireEvent.click(logoutTabElement);
  expect(window.location.pathname).toBe("/auth");
});
