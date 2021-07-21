import React from "react";
import produce from "immer";
import {
  render,
  screen,
  initialStoreMocked,
  generateMockedMinifigsList,
  fireEvent,
  within,
} from "utils/test";
import MinifigsPagination from "./MinifigsPagination";

const preloadedState = produce(initialStoreMocked, (draft) => {
  draft.minifigs.list = generateMockedMinifigsList(42);
  draft.minifigs.pagination = {
    nbPerPage: 25,
    activePage: 0,
    total: 42,
  };
});

test("render minifigs pagination", async () => {
  render(<MinifigsPagination />, { preloadedState });
  // First page
  expect(screen.getByText("1 - 25 of 42")).toBeInTheDocument();

  // Second page
  const nextButtonElement = screen.getByTitle("Next page");
  fireEvent.click(nextButtonElement);
  expect(screen.getByText("26 - 42 of 42")).toBeInTheDocument();

  // Setting nbPerPage to have only 1 page
  const select = screen.getByText("25/page");
  fireEvent.mouseDown(select);
  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText("50/page"));
  expect(screen.getByText("1 - 42")).toBeInTheDocument();
});
