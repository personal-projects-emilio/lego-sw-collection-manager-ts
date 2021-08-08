import React from "react";
import BurgerMenu from "./BurgerMenu";
import { render, fireEvent, screen } from "utils/test";

const logoutHandler = jest.fn();
test("renders burger menu", () => {
  render(<BurgerMenu isAuthenticate={false} logoutHandler={logoutHandler} />);
  expect(screen.getByText(/Authentication/i)).toBeInTheDocument();
});

test("render the minifigs as selected", () => {
  render(<BurgerMenu isAuthenticate={false} logoutHandler={logoutHandler} />, {
    route: "/minifigs",
  });

  expect(screen.getByTestId("minifigs").className).toMatch(/activeLink/i);
});

test("renders burger menu with logout option", () => {
  render(<BurgerMenu isAuthenticate logoutHandler={logoutHandler} />);
  const logoutElement = screen.getByText(/Logout/i);
  expect(logoutElement).toBeInTheDocument();
  fireEvent.click(logoutElement);
  expect(logoutHandler).toHaveBeenCalled();
});

test("open the menu and change the route", () => {
  render(<BurgerMenu isAuthenticate={false} logoutHandler={logoutHandler} />, {
    route: "/minifigs",
  });
  const burgerIconElement = screen.getByTestId("burger-icon");
  const authMenuElement = screen.getByTestId("auth");
  expect(authMenuElement).not.toBeVisible();

  fireEvent.click(burgerIconElement);
  expect(authMenuElement).toBeVisible();

  expect(authMenuElement.className).not.toMatch(/activeLink/i);
  fireEvent.click(authMenuElement);
  expect(authMenuElement.className).toMatch(/activeLink/i);
  expect(authMenuElement).not.toBeVisible();
});
