import React from "react";
import produce from "immer";
import {
  render,
  screen,
  fireEvent,
  mockedMinifigsList,
  waitFor,
  initialStoreMocked,
} from "utils/test";
import MinifigEdition from "./MinifigEdition";

const minifig = mockedMinifigsList[0];

test("toggle edit minifig modal", () => {
  render(<MinifigEdition {...minifig} />);
  expect(screen.queryByText("Edit sw0001a")).not.toBeInTheDocument();
  fireEvent.click(screen.getByTitle("Edit"));
  expect(screen.getByText("Edit sw0001a")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Cancel"));
  expect(screen.queryByText("Edit sw0001a")).not.toBeInTheDocument();
});

test("fail toggle owned minifig because of store error", async () => {
  const preloadedState = produce(initialStoreMocked, (draft) => {
    draft.auth.token = "Authenticated";
  });
  render(<MinifigEdition {...minifig} />, { preloadedState });
  const deleteButton = screen.getByTitle("Delete");
  fireEvent.click(screen.getByRole("checkbox"));
  await waitFor(() => expect(deleteButton).toHaveProperty("disabled", true));
  await waitFor(() => expect(deleteButton).toHaveProperty("disabled", false));
});

test("fail delete minifig because of store error", async () => {
  render(<MinifigEdition {...minifig} />);
  const deleteButton = screen.getByTitle("Delete");
  fireEvent.click(deleteButton);
  await waitFor(() => expect(deleteButton).toHaveProperty("disabled", true));
  await waitFor(() => expect(deleteButton).toHaveProperty("disabled", false));
});
