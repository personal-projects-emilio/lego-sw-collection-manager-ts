import React from 'react'
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import { fireEvent, mockedMinifigsList, render, screen } from "utils/test";
// import Minifigs from "./Frames";

// describe("minifigs", () => {
//   const handlers = [
//     rest.get(
//       `${process.env.REACT_APP_API_BASEURL}/minifigs.json`,
//       (_req, res, ctx) => {
//         return res(ctx.json(mockedMinifigsList), ctx.delay(150));
//       }
//     ),
//   ];

//   const server = setupServer(...handlers);

//   // Enable API mocking before tests.
//   beforeAll(() => server.listen());

//   // Reset any runtime request handlers we may add during the tests.
//   afterEach(() => server.resetHandlers());

//   // Disable API mocking after the tests are done.
//   afterAll(() => server.close());

//   test("fetches & receives the minifigs at mount", async () => {
//     render(<Minifigs />);

//     // should show no minifigs initially, and not be fetching a minifigs
//     expect(screen.getByText(/loading/i)).toBeInTheDocument();

//     // after some time, the minifigs should be received
//     expect(await screen.findAllByTestId("minifigs-pagination")).toHaveLength(2);
//     expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
//   });

//   test("reset the filters", async () => {
//     render(<Minifigs />);

//     // should show no minifigs initially, and not be fetching a minifigs
//     expect(screen.getByText(/loading/i)).toBeInTheDocument();

//     // after some time, the minifigs should be received
//     expect(await screen.findAllByTestId("minifigs-pagination")).toHaveLength(2);
//     expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

//     // Reset filters
//     expect(screen.queryByText("Reset filters")).not.toBeInTheDocument();
//     fireEvent.click(screen.getByDisplayValue("missing"));
//     fireEvent.click(screen.getByText("Reset filters"));
//     expect(screen.queryByText("Reset filters")).not.toBeInTheDocument();
//   });
// });
