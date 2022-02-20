import React from "react";
import BurgerMenu from "./BurgerMenu";
import { render, fireEvent, screen } from "utils/test";

const logoutHandler = jest.fn();
test("renders burger menu", () => {
  render(<BurgerMenu isAuthenticate={false} logoutHandler={logoutHandler} />);
  expect(screen.getByLabelText("application menu icon")).toBeInTheDocument();
});

test("render the minifigs as selected", () => {
  render(<BurgerMenu isAuthenticate={false} logoutHandler={logoutHandler} />, {
    route: "/minifigs",
  });
  const burgerIconElement = screen.getByLabelText("application menu icon");
  fireEvent.click(burgerIconElement);
  expect(screen.getByText(/Minifigs/i).className).toMatch(/Mui-selected/i);
});

test("renders burger menu with logout option", () => {
  render(<BurgerMenu isAuthenticate logoutHandler={logoutHandler} />);
  expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()

  const burgerIconElement = screen.getByLabelText("application menu icon");
  fireEvent.click(burgerIconElement);

  const logoutElement = screen.getByText(/Logout/i)
  fireEvent.click(logoutElement);
  expect(logoutHandler).toHaveBeenCalled();
});

test("open the menu and change the route", () => {
  render(<BurgerMenu isAuthenticate={false} logoutHandler={logoutHandler} />, {
    route: "/minifigs",
  });
  expect(screen.queryByText(/authentication/i)).not.toBeInTheDocument()

  const burgerIconElement = screen.getByLabelText("application menu icon");
  fireEvent.click(burgerIconElement);

  expect(screen.queryByText(/authentication/i)).toBeInTheDocument()
});
