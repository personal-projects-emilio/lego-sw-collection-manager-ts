import React from "react";
import { render, screen, fireEvent } from "utils/test";
import AutoComplete from "./AutoComplete";

test("multiple creatable autocomplete", async () => {
  const onChange = jest.fn();
  render(
    <AutoComplete
      value={[]}
      label="Test multiple creatable autocomplete"
      multiple
      creatable
      onChange={onChange}
      placeholder="Start typing"
      options={[
        {
          label: "Test 1",
          value: "Test 1",
        },
        {
          label: "Test 2",
          value: "Test 2",
        },
        {
          label: "Test 3",
          value: "Test 3",
        },
      ]}
    />
  );
  const inputElement = screen.getByPlaceholderText(
    "Start typing"
  ) as HTMLInputElement;
  fireEvent.input(inputElement, { target: { value: "test 4" } });
  expect(screen.getByText('Add "test 4"')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Add "test 4"'));
  expect(onChange).toHaveBeenLastCalledWith(["test 4"]);
  fireEvent.input(inputElement, { target: { value: "test" } });
  fireEvent.click(screen.getByText("Test 2"));
  expect(onChange).toHaveBeenLastCalledWith(["test 4", "Test 2"]);
});

test("multiple autocomplete", () => {
  const onChange = jest.fn();
  render(
    <AutoComplete
      value={[]}
      label="Test multiple creatable autocomplete"
      multiple
      placeholder="Start typing"
      onChange={onChange}
      options={[
        {
          label: "Test 1",
          value: "Test 1",
        },
        {
          label: "Test 2",
          value: "Test 2",
        },
        {
          label: "Test 3",
          value: "Test 3",
        },
      ]}
    />
  );
  const inputElement = screen.getByPlaceholderText(
    "Start typing"
  ) as HTMLInputElement;
  fireEvent.input(inputElement, { target: { value: "test" } });
  fireEvent.click(screen.getByText("Test 1"));
  expect(onChange).toHaveBeenLastCalledWith(["Test 1"]);
  fireEvent.input(inputElement, { target: { value: "test" } });
  fireEvent.click(screen.getByText("Test 2"));
  expect(onChange).toHaveBeenLastCalledWith(["Test 1", "Test 2"]);
});

test("creatable autocomplete", () => {
  const onChange = jest.fn();
  render(
    <AutoComplete
      value={null}
      label="Test multiple creatable autocomplete"
      creatable
      placeholder="Start typing"
      onChange={onChange}
      options={[
        {
          label: "Test 1",
          value: "Test 1",
        },
        {
          label: "Test 2",
          value: "Test 2",
        },
        {
          label: "Test 3",
          value: "Test 3",
        },
      ]}
    />
  );
  const inputElement = screen.getByPlaceholderText(
    "Start typing"
  ) as HTMLInputElement;
  fireEvent.input(inputElement, { target: { value: "test 4" } });
  expect(screen.getByText('Add "test 4"')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Add "test 4"'));
  expect(onChange).toHaveBeenLastCalledWith("test 4");
  // fireEvent.input(inputElement, { target: { value: "test" } });
  // fireEvent.click(screen.getByText("Test 2"));
  // expect(onChange).toHaveBeenLastCalledWith(["test 4", "Test 2"]);
});
