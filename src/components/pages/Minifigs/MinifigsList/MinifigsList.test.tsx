import React from "react";
import produce from "immer";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  fireEvent,
  initialStoreMocked,
  mockedMinifigsList,
  waitFor,
} from "utils/test";
import MinifigsList from "./MinifigsList";
import { MinifigsList as MinifigsListType } from "interfaces/minifigs";

describe("MinifigsList", () => {
  const handlers = [
    rest.patch<{ possessed: boolean }>(
      `${process.env.REACT_APP_API_BASEURL as string}/*`,
      (req, res, ctx) => {
        if (req.body.possessed) {
          return res(
            ctx.delay(50),
            ctx.status(500),
            ctx.json({ errorMessage: "Something went wrong" })
          );
        }
        return res(
          ctx.json(
            mockedMinifigsList.map((minifig, i) => ({
              ...minifig,
              possessed: i === 0 ? req.body.possessed : minifig.possessed,
            }))
          ),
          ctx.delay(50)
        );
      }
    ),
    rest.put<MinifigsListType>(
      `${process.env.REACT_APP_API_BASEURL as string}/*`,
      (req, res, ctx) => {
        if (req.body.length === 0) {
          return res(
            ctx.delay(50),
            ctx.status(500),
            ctx.json({ errorMessage: "Something went wrong" })
          );
        }
        return res(ctx.json([]), ctx.delay(50));
      }
    ),
  ];

  const server = setupServer(...handlers);

  // Enable API mocking before tests and hide expected error logs
  beforeAll(() => {
    server.listen();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  // Reset any runtime request handlers we may add during the tests
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done
  afterAll(() => server.close());
  test("render null", async () => {
    render(<MinifigsList />);
    expect(screen.queryByTestId(/pagination/i)).toBeNull();
    expect(screen.queryByText(/filters/i)).toBeNull();
  });

  test("render no results", async () => {
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.list = [
        {
          id: "sw0001",
          possessed: false,
          tags: [],
          characterName: "test",
          name: "test",
        },
      ];
      draft.minifigs.filters.show = "owned";
    });

    render(<MinifigsList />, { preloadedState });
    const resetButtonElement = screen.getByText(/Reset filters/i);
    expect(resetButtonElement).toBeInTheDocument();
    fireEvent.click(resetButtonElement);
    expect(resetButtonElement).not.toBeInTheDocument();
  });

  test("can delete a minifig in store", async () => {
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.list = mockedMinifigsList;
    });

    render(<MinifigsList />, { preloadedState });
    expect(screen.queryByText(mockedMinifigsList[0].id)).not.toBeNull();
    fireEvent.click(screen.getAllByTitle("Delete")[0]);
    fireEvent.click(screen.getByText("Confirm"));
    await waitFor(() =>
      expect(screen.queryByText(mockedMinifigsList[0].id)).toBeNull()
    );
  });

  test("can delete a minifig in server", async () => {
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.list = mockedMinifigsList;
      draft.auth.token = "Authenticated";
    });

    render(<MinifigsList />, { preloadedState });
    expect(screen.queryByText(mockedMinifigsList[0].id)).not.toBeNull();
    fireEvent.click(screen.getAllByTitle("Delete")[0]);
    fireEvent.click(screen.getByText("Confirm"));
    await waitFor(() =>
      expect(screen.queryByText(mockedMinifigsList[0].id)).toBeNull()
    );
  });

  test("can not delete a minifig in because of server error", async () => {
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.list = [mockedMinifigsList[0]];
      draft.auth.token = "Authenticated";
    });

    render(<MinifigsList />, { preloadedState });
    const deleteButton = screen.getAllByTitle("Delete")[0];
    expect(screen.queryByText(mockedMinifigsList[0].id)).not.toBeNull();
    fireEvent.click(deleteButton);
    fireEvent.click(screen.getByText("Confirm"));
    await waitFor(() => expect(deleteButton).toHaveProperty("disabled", true));
    await waitFor(() => expect(deleteButton).toHaveProperty("disabled", false));
    expect(screen.queryByText(mockedMinifigsList[0].id)).not.toBeNull();
  });

  test("can toggle owned of a minifig in store", async () => {
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.list = mockedMinifigsList;
    });

    render(<MinifigsList />, { preloadedState });
    const switchElement = screen.getAllByRole("checkbox")[0];
    expect(switchElement).toHaveProperty("checked", true);
    fireEvent.click(switchElement);
    await waitFor(() => expect(switchElement).toHaveProperty("checked", false));
  });

  test("can toggle owned of a minifig in server", async () => {
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.list = mockedMinifigsList;
      draft.auth.token = "Authenticated";
    });

    render(<MinifigsList />, { preloadedState });
    const switchElement = screen.getAllByRole("checkbox")[0];
    expect(switchElement).toHaveProperty("checked", true);
    fireEvent.click(switchElement);
    await waitFor(() => expect(switchElement).toHaveProperty("checked", false));
  });

  test("can not toggle owned of a minifig because of server error", async () => {
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.list = [{ ...mockedMinifigsList[0], possessed: false }];
      draft.auth.token = "Authenticated";
    });

    render(<MinifigsList />, { preloadedState });
    const deleteButton = screen.getAllByTitle("Delete")[0];
    expect(deleteButton).toHaveProperty("disabled", false);
    const switchElement = screen.getAllByRole("checkbox")[0];
    expect(switchElement).toHaveProperty("checked", false);
    fireEvent.click(switchElement);
    await waitFor(() => expect(deleteButton).toHaveProperty("disabled", true));
    await waitFor(() => expect(deleteButton).toHaveProperty("disabled", false));
    expect(switchElement).toHaveProperty("checked", false);
  });
});
