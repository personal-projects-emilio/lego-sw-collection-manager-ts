import React from "react";
import BurgerMenu from "./BurgerMenu";
import { render, fireEvent, screen } from "utils/test";

test("renders burger menu", () => {
  render(<BurgerMenu />);
  const authTabElement = screen.getByText(/Authentication/i);
  expect(authTabElement).toBeInTheDocument();
});

test("render the minifigs as selected", () => {
  render(<BurgerMenu />, {}, { route: "/minifigs" });

  const minifigsTabElement = screen.getByTestId("minifigs");
  expect(minifigsTabElement.className).toMatch(/activeLink/i);
});

test("open the menu and change the route", () => {
  render(<BurgerMenu />, {}, { route: "/minifigs" });
  const burgerIconElement = screen.getByTestId("burger-icon");
  const authTabElement = screen.getByTestId("auth");
  expect(authTabElement).not.toBeVisible();

  fireEvent.click(burgerIconElement);
  expect(authTabElement).toBeVisible();

  expect(authTabElement.className).not.toMatch(/activeLink/i);
  fireEvent.click(authTabElement);
  expect(authTabElement.className).toMatch(/activeLink/i);
  expect(authTabElement).not.toBeVisible();
});
