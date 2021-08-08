import React from "react";
import { screen } from "@testing-library/react";
import App from "./App";
import { render } from "utils/test";

test("renders the header", () => {
  render(<App />);
  const headerElement = screen.getByText(/lego sw/i);
  expect(headerElement).toBeInTheDocument();
});

test("check the autoSignIn and login", () => {
  const localStorageMocked = {
    token: "idToken",
    expirationDate: new Date(
      new Date().setHours(new Date().getHours() + 1)
    ).toISOString(),
    userId: "localId",
  };
  render(<App />, { localStorageMocked });
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test("check the autoSignIn and logout", () => {
  const localStorageMocked = {
    token: "idToken",
    expirationDate: new Date(new Date().setHours(new Date().getHours() - 1)),
    userId: "localId",
  };
  render(<App />, { localStorageMocked });
  expect(screen.getByText(/authentication/i)).toBeInTheDocument();
});

test("check the logout from expirationDate", async () => {
  const localStorageMocked = {
    token: "idToken",
    expirationDate: new Date(
      new Date().setSeconds(new Date().getSeconds() + 1)
    ).toISOString(),
    userId: "localId",
  };
  render(<App />, { localStorageMocked });
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
  expect(await screen.findByText(/authentication/i)).toBeInTheDocument();
});
