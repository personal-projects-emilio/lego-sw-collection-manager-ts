import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, render, screen, waitFor } from "utils/test";
import Auth, { AuthInputs } from "./Auth";

describe("Auth", () => {
  const handlers = [
    rest.post<AuthInputs>(
      `https://identitytoolkit.googleapis.com/v1/*`,
      (req, res, ctx) => {
        if (req.body.email === "error@test.com") {
          return res(ctx.delay(50), ctx.status(500));
        }
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
          ctx.delay(50)
        );
      }
    ),
  ];

  const server = setupServer(...handlers);

  // Enable API mocking before tests and hide expected error logs
  beforeAll(() => {
    server.listen();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

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

  test("fail to submit the form and authenticate because of server error", async () => {
    render(<Auth />, { route: "/auth" });
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "error@test.com" },
    });
    fireEvent.input(screen.getAllByLabelText(/password/i)[0], {
      target: { value: "azerty" },
    });
    expect(window.location.pathname).toBe("/auth");
    fireEvent.submit(screen.getAllByRole("button")[1]);
    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });
});
