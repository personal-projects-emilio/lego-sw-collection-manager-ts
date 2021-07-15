import React from "react";
import { RootState } from "store";
import { render, screen } from "utils/test";
import MinifigsList from "./MinifigsList";

test("render null", async () => {
  const preloadedState: RootState = {
    minifigs: {
      list: null,
      tags: null,
      characNames: null,
    },
  };
  render(<MinifigsList />, { preloadedState });
  expect(screen.queryByText(/pagination/i)).toBeNull();
  expect(screen.queryByText(/filters/i)).toBeNull();
});

test("render no results", async () => {
  const preloadedState: RootState = {
    minifigs: {
      list: [],
      tags: null,
      characNames: null,
    },
  };
  render(<MinifigsList />, { preloadedState });
  expect(screen.queryByText(/pagination/i)).toBeNull();
  expect(screen.queryAllByText(/filters/i)).not.toBeNull();
});
