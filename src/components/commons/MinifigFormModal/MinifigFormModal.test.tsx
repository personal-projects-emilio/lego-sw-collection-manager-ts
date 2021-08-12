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
import MinifigFormModal from "./MinifigFormModal";
import { getTagsAndCharacNames } from "utils";
import { MinifigsList } from "interfaces/minifigs";

describe("MinifigFormModal", () => {
  const handleClose = jest.fn();

  const handlers = [
    rest.put<MinifigsList>(
      `${process.env.REACT_APP_API_BASEURL as string}/*`,
      (req, res, ctx) => {
        if (req.body[0].name !== "Error") {
          return res(ctx.json([{}]), ctx.delay(50));
        } else {
          return res(
            ctx.delay(50),
            ctx.status(500),
            ctx.json({ errorMessage: "Something went wrong" })
          );
        }
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

  test("manage minifig id errors", async () => {
    const { tags, characNames } = getTagsAndCharacNames(mockedMinifigsList);
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.tags = tags;
      draft.minifigs.characNames = characNames;
      draft.minifigs.list = mockedMinifigsList;
    });
    render(<MinifigFormModal handleClose={handleClose} />, { preloadedState });
    const idInputElement = screen.getByPlaceholderText(
      "Minifig id (ex: sw0001a)"
    ) as HTMLInputElement;
    fireEvent.input(idInputElement, { target: { value: "swaze" } });
    expect(
      await screen.findByText(
        "This need to be a minifig reference (/^sw[0-9]{4}[abcds]?$/)"
      )
    ).toBeInTheDocument();
    fireEvent.input(idInputElement, { target: { value: "sw0003" } });
    expect(
      await screen.findByText("This minifig already exists")
    ).toBeInTheDocument();
  });

  test("edit minifig name on server", async () => {
    const { tags, characNames } = getTagsAndCharacNames(mockedMinifigsList);
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.tags = tags;
      draft.minifigs.characNames = characNames;
      draft.minifigs.list = mockedMinifigsList;
      draft.auth.token = "Authenticated";
    });
    render(
      <MinifigFormModal
        handleClose={handleClose}
        editMinifigData={mockedMinifigsList[0]}
      />,
      { preloadedState }
    );
    const nameInputElement = screen.getByPlaceholderText(
      "Minifig name (ex: Battle Droid Tan with Back Plate)"
    ) as HTMLInputElement;
    expect(nameInputElement.value).toBe(mockedMinifigsList[0].name);
    fireEvent.input(nameInputElement, { target: { value: "New name" } });
    fireEvent.submit(screen.getAllByRole("button")[4]);
    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("progressbar")).toBeNull());
  });

  test("edit minifig name on store", () => {
    const { tags, characNames } = getTagsAndCharacNames(mockedMinifigsList);
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.tags = tags;
      draft.minifigs.characNames = characNames;
      draft.minifigs.list = mockedMinifigsList;
    });
    render(
      <MinifigFormModal
        handleClose={handleClose}
        editMinifigData={mockedMinifigsList[0]}
      />,
      { preloadedState }
    );
    const nameInputElement = screen.getByPlaceholderText(
      "Minifig name (ex: Battle Droid Tan with Back Plate)"
    ) as HTMLInputElement;
    expect(nameInputElement.value).toBe(mockedMinifigsList[0].name);
    fireEvent.input(nameInputElement, { target: { value: "New name" } });
    fireEvent.submit(screen.getAllByRole("button")[4]);
  });

  test("reject minifig edit because no minifigs in the store", () => {
    const { tags, characNames } = getTagsAndCharacNames(mockedMinifigsList);
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.tags = tags;
      draft.minifigs.characNames = characNames;
    });
    render(
      <MinifigFormModal
        handleClose={handleClose}
        editMinifigData={mockedMinifigsList[0]}
      />,
      { preloadedState }
    );
    const nameInputElement = screen.getByPlaceholderText(
      "Minifig name (ex: Battle Droid Tan with Back Plate)"
    ) as HTMLInputElement;
    expect(nameInputElement.value).toBe(mockedMinifigsList[0].name);
    fireEvent.input(nameInputElement, { target: { value: "New name" } });
    fireEvent.submit(screen.getAllByRole("button")[4]);
  });

  test("reject minifig edit because of server error", async () => {
    const { tags, characNames } = getTagsAndCharacNames(mockedMinifigsList);
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.tags = tags;
      draft.minifigs.characNames = characNames;
      draft.minifigs.list = mockedMinifigsList;
      draft.auth.token = "Authenticated";
    });
    render(
      <MinifigFormModal
        handleClose={handleClose}
        editMinifigData={mockedMinifigsList[0]}
      />,
      { preloadedState }
    );
    const nameInputElement = screen.getByPlaceholderText(
      "Minifig name (ex: Battle Droid Tan with Back Plate)"
    ) as HTMLInputElement;
    expect(nameInputElement.value).toBe(mockedMinifigsList[0].name);
    fireEvent.input(nameInputElement, { target: { value: "Error" } });
    fireEvent.submit(screen.getAllByRole("button")[4]);
    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("progressbar")).toBeNull());
  });

  test("add minifig on server", async () => {
    const { tags, characNames } = getTagsAndCharacNames(mockedMinifigsList);
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.tags = tags;
      draft.minifigs.characNames = characNames;
      draft.minifigs.list = mockedMinifigsList;
      draft.auth.token = "Authenticated";
    });
    render(<MinifigFormModal handleClose={handleClose} />, { preloadedState });
    fireEvent.input(screen.getByPlaceholderText("Minifig id (ex: sw0001a)"), {
      target: { value: "sw0001" },
    });
    fireEvent.input(
      screen.getByPlaceholderText(
        "Minifig name (ex: Battle Droid Tan with Back Plate)"
      ),
      { target: { value: "Battle Droid Tan with Back Plate" } }
    );
    fireEvent.focus(
      screen.getByPlaceholderText("Character name (ex: Battle Droid)")
    );
    fireEvent.click(screen.getByText("Boba Fett"));
    fireEvent.submit(screen.getAllByRole("button")[3]);
    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("progressbar")).toBeNull());
  });

  test("add minifig on store", () => {
    const { tags, characNames } = getTagsAndCharacNames(mockedMinifigsList);
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.tags = tags;
      draft.minifigs.characNames = characNames;
      draft.minifigs.list = mockedMinifigsList;
    });
    render(<MinifigFormModal handleClose={handleClose} />, { preloadedState });
    fireEvent.input(screen.getByPlaceholderText("Minifig id (ex: sw0001a)"), {
      target: { value: "sw0001" },
    });
    fireEvent.input(
      screen.getByPlaceholderText(
        "Minifig name (ex: Battle Droid Tan with Back Plate)"
      ),
      { target: { value: "Battle Droid Tan with Back Plate" } }
    );
    fireEvent.focus(
      screen.getByPlaceholderText("Character name (ex: Battle Droid)")
    );
    fireEvent.click(screen.getByText("Boba Fett"));
    fireEvent.submit(screen.getAllByRole("button")[3]);
  });

  test("reject minifig add because no minifigs in the store", () => {
    const { tags, characNames } = getTagsAndCharacNames(mockedMinifigsList);
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.tags = tags;
      draft.minifigs.characNames = characNames;
    });
    render(<MinifigFormModal handleClose={handleClose} />, { preloadedState });
    fireEvent.input(screen.getByPlaceholderText("Minifig id (ex: sw0001a)"), {
      target: { value: "sw0001" },
    });
    fireEvent.input(
      screen.getByPlaceholderText(
        "Minifig name (ex: Battle Droid Tan with Back Plate)"
      ),
      { target: { value: "Battle Droid Tan with Back Plate" } }
    );
    fireEvent.focus(
      screen.getByPlaceholderText("Character name (ex: Battle Droid)")
    );
    fireEvent.click(screen.getByText("Boba Fett"));
    fireEvent.submit(screen.getAllByRole("button")[3]);
  });

  test("reject minifig add because of server error", async () => {
    const { tags, characNames } = getTagsAndCharacNames(mockedMinifigsList);
    const preloadedState = produce(initialStoreMocked, (draft) => {
      draft.minifigs.tags = tags;
      draft.minifigs.characNames = characNames;
      draft.minifigs.list = mockedMinifigsList;
      draft.auth.token = "Authenticated";
    });
    render(<MinifigFormModal handleClose={handleClose} />, { preloadedState });
    fireEvent.input(screen.getByPlaceholderText("Minifig id (ex: sw0001a)"), {
      target: { value: "sw0001" },
    });
    fireEvent.input(
      screen.getByPlaceholderText(
        "Minifig name (ex: Battle Droid Tan with Back Plate)"
      ),
      { target: { value: "Error" } }
    );
    fireEvent.focus(
      screen.getByPlaceholderText("Character name (ex: Battle Droid)")
    );
    fireEvent.click(screen.getByText("Boba Fett"));
    fireEvent.submit(screen.getAllByRole("button")[3]);
    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("progressbar")).toBeNull());
  });
});
