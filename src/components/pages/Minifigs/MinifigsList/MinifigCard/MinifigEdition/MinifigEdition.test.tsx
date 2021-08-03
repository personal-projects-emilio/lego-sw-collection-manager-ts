import React from "react";
import { render, screen, fireEvent } from "utils/test";
import { Minifig } from "interfaces/minifigs";
import MinifigEdition from "./MinifigEdition";

const minifig: Minifig = {
  characterName: "Battle Droid",
  id: "sw0001a",
  name: "Battle Droid Tan with Back Plate",
  possessed: true,
  tags: ["Battle Droid", "CIS", "Droid"],
};

test("toggle edit minifig modal", () => {
  render(<MinifigEdition {...minifig} />);
  expect(screen.queryByText("Edit sw0001a")).not.toBeInTheDocument();
  fireEvent.click(screen.getByTitle("Edit"));
  expect(screen.getByText("Edit sw0001a")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Cancel"));
  expect(screen.queryByText("Edit sw0001a")).not.toBeInTheDocument();
});
