import React from "react";
import produce from "immer";
import {
  render,
  screen,
  fireEvent,
  initialStoreMocked,
  mockedMinifigsList,
} from "utils/test";
import MinifigFormModal from "./MinifigFormModal";
import { getTagsAndCharacNames } from "utils";

const handleClose = jest.fn();
const { tags, characNames } = getTagsAndCharacNames(mockedMinifigsList);
const preloadedState = produce(initialStoreMocked, (draft) => {
  draft.minifigs.tags = tags;
  draft.minifigs.characNames = characNames;
  draft.minifigs.list = mockedMinifigsList;
});

test("manage minifig id errors", async () => {
  render(<MinifigFormModal handleClose={handleClose} />, { preloadedState });
  const idInputElement = screen.getByPlaceholderText(
    "Minifig id (ex: sw0001a)"
  ) as HTMLInputElement;
  fireEvent.input(idInputElement, { target: { value: "swaze" } });
  expect(
    await screen.findByText("This need to be a minifig reference")
  ).toBeInTheDocument();
  fireEvent.input(idInputElement, { target: { value: "sw0003" } });
  expect(
    await screen.findByText("This minifig already exists")
  ).toBeInTheDocument();
});
