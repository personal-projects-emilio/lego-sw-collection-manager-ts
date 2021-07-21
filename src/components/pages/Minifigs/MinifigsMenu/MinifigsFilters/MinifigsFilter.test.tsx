import React from "react";
import produce from "immer";
import { render, screen, fireEvent, initialStoreMocked } from "utils/test";
import MinifigsFilters from "./MinifigsFilters";

const preloadedState = produce(initialStoreMocked, (draft) => {
  draft.minifigs.tags = [
    { name: "Jedi", amount: 5 },
    { name: "Sith", amount: 2 },
  ];
  draft.minifigs.characNames = [
    { name: "Darth Vader", amount: 2 },
    { name: "Luke Skywalker", amount: 5 },
  ];
});

test("render radio button show filter", () => {
  render(<MinifigsFilters />, { preloadedState });
  const allShowInputElement = screen.getByDisplayValue(
    "all"
  ) as HTMLInputElement;
  const ownedShowInputElement = screen.getByDisplayValue(
    "owned"
  ) as HTMLInputElement;
  expect(allShowInputElement.checked).toBeTruthy();
  expect(ownedShowInputElement.checked).toBeFalsy();
  fireEvent.click(ownedShowInputElement);
  expect(allShowInputElement.checked).toBeFalsy();
  expect(ownedShowInputElement.checked).toBeTruthy();
});

test("render character name filter autocomplete", async () => {
  render(<MinifigsFilters />, { preloadedState });
  const characNameInputElement = screen.getByPlaceholderText(
    "Filter by character name"
  ) as HTMLInputElement;

  // Opening the popper
  expect(screen.queryByText(/Darth Vader/i)).not.toBeInTheDocument();
  const openPopperButtons = await screen.findAllByTitle(/open/i);
  fireEvent.click(openPopperButtons[0]);

  // Selecting a character name
  const vaderElement = screen.getByText(/darth Vader/i);
  fireEvent.click(vaderElement);
  expect(characNameInputElement.value).toBe("Darth Vader (2)");

  // Clearing the input
  const clearPopperButtons = await screen.findAllByTitle(/clear/i);
  fireEvent.click(clearPopperButtons[0]);
  expect(characNameInputElement.value).toBe("");
});

test("render tag  filter autocomplete", async () => {
  render(<MinifigsFilters />, { preloadedState });
  const tagInputElement = screen.getByPlaceholderText(
    "Filter by tag"
  ) as HTMLInputElement;

  // Opening the tag popper
  const openPopperButtons = await screen.findAllByTitle(/open/i);
  fireEvent.click(openPopperButtons[1]);

  // Selecting a tag
  expect(tagInputElement.value).toBe("");
  const sithElement = screen.getByText(/sith/i);
  fireEvent.click(sithElement);
  expect(tagInputElement.value).toBe("Sith (2)");
});

test("set empty options to tag/characName autocomplete", async () => {
  render(<MinifigsFilters />);
  // Opening the tag popper
  const openPopperButtons = await screen.findAllByTitle(/open/i);
  fireEvent.click(openPopperButtons[1]);
  // No options in the popper
  expect(screen.getByText(/no options/i)).toBeInTheDocument();
});
