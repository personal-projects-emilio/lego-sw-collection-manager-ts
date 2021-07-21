import React from "react";
import produce from "immer";
import { render, screen, fireEvent, initialStoreMocked } from "utils/test";
import MinifigsList from "./MinifigsList";

test("render null", async () => {
  render(<MinifigsList />);
  expect(screen.queryByTestId(/pagination/i)).toBeNull();
  expect(screen.queryByText(/filters/i)).toBeNull();
});

test("render no results", async () => {
  const preloadedState = produce(initialStoreMocked, (draft) => {
    draft.minifigs.list = [
      {
        id: "sw0001",
        possessed: false,
        tags: [],
        characterName: "test",
        name: "test",
      },
    ];
    draft.minifigs.filters.show = "owned";
  });

  render(<MinifigsList />, { preloadedState });
  const resetButtonElement = screen.getByText(/Reset filters/i);
  expect(resetButtonElement).toBeInTheDocument();
  fireEvent.click(resetButtonElement);
  expect(resetButtonElement).not.toBeInTheDocument();
});
