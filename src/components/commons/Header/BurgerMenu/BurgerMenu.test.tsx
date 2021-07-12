import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import BurgerMenu from "./BurgerMenu";
import { renderWithRouter, renderWithMemoryRouter } from "utils";

test("renders burger menu", () => {
  renderWithMemoryRouter(<BurgerMenu />);
  const authTabElement = screen.getByText(/Authentication/i);
  expect(authTabElement).toBeInTheDocument();
});

test("render the minifigs as selected", () => {
  renderWithRouter(<BurgerMenu />, { route: "/minifigs" });

  const minifigsTabElement = screen.getByTestId("minifigs");
  expect(minifigsTabElement.className).toMatch(/activeLink/i);
});

test("open the menu and change the route", () => {
  renderWithRouter(<BurgerMenu />, { route: "/minifigs" });
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
