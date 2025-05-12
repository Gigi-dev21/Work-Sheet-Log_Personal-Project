import { getByRole, render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import LoginForm from "./LoginForm";
import store from "../../Redux/store";
import userEvent from "@testing-library/user-event";
import { act } from "react";

describe("Login input fields", () => {
  // beforeEach(() => {
  //   const handleLoginMock = jest.fn();
  //   render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <LoginForm handleLogin={handleLoginMock} />
  //       </BrowserRouter>
  //     </Provider>
  //   );
  // });

  // test("email and password must be initally empty", () => {
  //   const emailInput = screen.getByTestId("emailInput");
  //   const passwordInput = screen.getByTestId("passInput");
  //   expect(emailInput.value).toBe("");
  //   expect(passwordInput.value).toBe("");
  // });

  // test("able to updated email value", () => {
  //   const emailInput = screen.getByTestId("emailInput");
  //   userEvent.type(emailInput, "email@gmail.com");
  //   expect(emailInput.value).toBe("email@gmail.com");
  // });

  // test("able to updated password value", () => {
  //   const passwordInput = screen.getByTestId("passInput");
  //   userEvent.type(passwordInput, "hhshs%");
  //   expect(passwordInput.value).toBe("hhshs%");
  // });

  test("when login button clicked, handleLogin should be called", async () => {
    const handleLoginMock = jest.fn();
    // Render the LoginForm component wrapped in the Redux Provider
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });

    // Simulate clicking the login button
    await act(async () => {
      userEvent.click(loginButton);
    });

    // Check if handleLoginMock was called once
    expect(handleLoginMock).toBeCalledTimes(1);
  });
});
