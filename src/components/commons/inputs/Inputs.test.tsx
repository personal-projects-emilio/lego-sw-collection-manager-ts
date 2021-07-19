import React from "react";
import { render, screen } from "utils/test";
import Inputs from "./Inputs";

test("render not supported inuput", async () => {
  // @ts-ignore
  render(<Inputs />);
  expect(screen.getByText(/Input not supported/i)).toBeInTheDocument();
});
