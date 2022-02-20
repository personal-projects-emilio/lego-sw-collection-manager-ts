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
  fireEvent.click(screen.getByLabelText(/edit/i));
  expect(screen.getByText("Edit sw0001a")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Cancel"));
  expect(screen.queryByText("Edit sw0001a")).not.toBeInTheDocument();
});

test("fail toggle owned minifig because of store error", async () => {
  const preloadedState = produce(initialStoreMocked, (draft) => {
    draft.auth.token = "Authenticated";
  });
  render(<MinifigEdition {...minifig} />, { preloadedState });
  const deleteButton = screen.getByLabelText(/delete/i);
  fireEvent.click(screen.getByRole("checkbox"));
  await waitFor(() => expect(deleteButton).toHaveProperty("disabled", true));
  await waitFor(() => expect(deleteButton).toHaveProperty("disabled", false));
});

test("close delete minifig modal", () => {
  render(<MinifigEdition {...minifig} />);
  expect(screen.queryByText("Confirm")).not.toBeInTheDocument();
  fireEvent.click(screen.getByLabelText(/delete/i));
  expect(screen.getByText("Confirm")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Cancel"));
  expect(screen.queryByText("Confirm")).not.toBeInTheDocument();
  fireEvent.click(screen.getByLabelText(/delete/i));
  fireEvent.keyDown(screen.getByText(/Are you sure/i), { key: "Escape" });
  expect(screen.queryByText(/Are you sure/i)).not.toBeInTheDocument();
});

test("fail delete minifig because of store error", async () => {
  render(<MinifigEdition {...minifig} />);
  const deleteButton = screen.getByLabelText(/delete/i);
  fireEvent.click(deleteButton);
  fireEvent.click(screen.getByText("Confirm"));
  await waitFor(() => expect(deleteButton).toHaveProperty("disabled", true));
  await waitFor(() => expect(deleteButton).toHaveProperty("disabled", false));
});
