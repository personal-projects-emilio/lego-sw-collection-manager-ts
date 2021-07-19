import React from "react";
import { RootState } from "store";
import { render, screen, fireEvent } from "utils/test";
import MinifigsList from "./MinifigsList";

test("render null", async () => {
  const preloadedState: RootState = {
    minifigs: {
      list: null,
      tags: null,
      characNames: null,
      filters: {
        show: "all",
        tag: null,
        characName: null,
      },
    },
  };
  render(<MinifigsList />, { preloadedState });
  expect(screen.queryByText(/pagination/i)).toBeNull();
  expect(screen.queryByText(/filters/i)).toBeNull();
});

test("render no results", async () => {
  const preloadedState: RootState = {
    minifigs: {
      list: [
        {
          id: "sw0001",
          possessed: false,
          tags: [],
          characterName: "test",
          name: "test",
        },
      ],
      tags: null,
      characNames: null,
      filters: {
        show: "owned",
        tag: null,
        characName: null,
      },
    },
  };
  render(<MinifigsList />, { preloadedState });
  const resetButtonElement = screen.getByText(/Reset filters/i);
  expect(resetButtonElement).toBeInTheDocument();
  fireEvent.click(resetButtonElement);
  expect(resetButtonElement).not.toBeInTheDocument();
});
