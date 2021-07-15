import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "utils/test";
import Minifigs from "./Minifigs";

export const handlers = [
  rest.get(
    `${process.env.REACT_APP_API_BASEURL}/minifigs.json`,
    (_req, res, ctx) => {
      return res(ctx.json([{ id: "sw0001" }]), ctx.delay(150));
    }
  ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("fetches & receives the minifigs at mount", async () => {
  render(<Minifigs />);

  // should show no user initially, and not be fetching a user
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // after some time, the user should be received
  expect(await screen.findAllByText(/pagination/i)).toHaveLength(2);
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
