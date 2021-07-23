import React from "react";
import { fireEvent, render, screen } from "utils/test";
import { SwitchProps } from "../interface";
import Switch from "./Switch";

const initialProps: SwitchProps = {
  type: "switch",
  value: true,
  changeHandler: jest.fn(),
};

test("render switch with label", async () => {
  render(<Switch {...initialProps} label="Switch with label" />);
  expect(screen.getByText("Switch with label")).toBeInTheDocument();
  fireEvent.click(screen.getByDisplayValue("true"));
  expect(initialProps.changeHandler).toHaveBeenCalledWith(false);
});

test("render switch without label", async () => {
  render(<Switch {...initialProps} />);
  console.log(screen.debug());
  expect(screen.queryByText("Switch with label")).not.toBeInTheDocument();
});
