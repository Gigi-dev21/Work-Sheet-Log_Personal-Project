import {
  fireEvent,
  getByRole,
  queryByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import SignupForm from "./SignupForm";
import { BrowserRouter } from "react-router-dom";
import store from "../../Redux/store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useEffect } from "react";

describe("Signup Input fields", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
      </Provider>
    );
  });
  test("Inputs are initally empty", () => {
    const email = screen.getByTestId("emailInput");
    const password = screen.getByTestId("passwordInput");
    const fullname = screen.getByTestId("fullNameInput");

    expect(email.value).toBe("");
    expect(password.value).toBe("");
    expect(fullname.value).toBe("");
  });

  test("Able to update the input fields value", () => {
    const email = screen.getByTestId("emailInput");
    const password = screen.getByTestId("passwordInput");
    const fullname = screen.getByTestId("fullNameInput");

    userEvent.type(email, "hhh@gmail.com");
    userEvent.type(password, "password");
    userEvent.type(fullname, "fullname");

    expect(email.value).toBe("hhh@gmail.com");
    expect(password.value).toBe("password");
    expect(fullname.value).toBe("fullname");
  });

  test("email input must be valid", async () => {
    const email = screen.getByTestId("emailInput");
    const errorMessage = screen.queryByText("Please enter a valid email");
    expect(errorMessage).not.toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Sign up" });

    userEvent.type(email, "hhhgmail.com");
    // fireEvent.click(button);
    userEvent.click(button);

    // const errorMessageAgain = screen.queryByText("Please enter a valid email");
    // expect(errorMessageAgain).toBeInTheDocument();
  });

  test.only("must be a strong password", async () => {
    const password = screen.getByTestId("passwordInput");
    const email = screen.getByTestId("emailInput");
    const button = screen.getByRole("button", { name: "Sign up" });
    const errorMessage = screen.queryByText(
      "Password must be at least 6 characters long"
    );
    expect(errorMessage).not.toBeInTheDocument();

    userEvent.type(email, "embetm27@gmail.com");
    userEvent.type(password, "invalid");
    userEvent.click(button);

    await waitFor(() => {
      const errorMessage = screen.queryByText(
        "Password must be at least 6 characters long"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
