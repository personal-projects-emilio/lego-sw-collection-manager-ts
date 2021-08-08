import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, render, screen, waitFor } from "utils/test";
import Auth from "./Auth";

describe("Auth", () => {
  const handlers = [
    rest.post(
      `https://identitytoolkit.googleapis.com/v1/*`,
      (_req, res, ctx) => {
        return res(
          ctx.json({
            kind: "identitytoolkit#VerifyPasswordResponse",
            localId: "localId",
            email: "test@test.com",
            displayName: "",
            idToken: "idToken",
            registered: true,
            refreshToken: "refreshToken",
            expiresIn: "3600",
          }),
          ctx.delay(150)
        );
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

  test("render the authenticate form", async () => {
    render(<Auth />);
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/toggle password visibility/i));
    fireEvent.mouseDown(screen.getByLabelText(/toggle password visibility/i));
  });

  test("submit the form and authenticate", async () => {
    render(<Auth />, { route: "/auth" });
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.input(screen.getAllByLabelText(/password/i)[0], {
      target: { value: "azerty" },
    });
    expect(window.location.pathname).toBe("/auth");
    fireEvent.submit(screen.getAllByRole("button")[1]);
    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(window.location.pathname).toBe("/minifigs"));
    expect(screen.queryByRole("progressbar")).toBeNull();
  });
});
