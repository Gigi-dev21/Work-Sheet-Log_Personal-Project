import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Banner from "./Banner";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Redux/store";

describe("Banner Content Rendering", () => {
  test("renders welcome text when content is empty", () => {
    render(<Banner content="" />);
    const welcomeText = screen.getByText("Time sheet Login Portal");
    expect(welcomeText).toBeInTheDocument();
  });

  test('renders LoginForm when content is "loginForm"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Banner content="loginForm" />
        </BrowserRouter>
      </Provider>
    );
    const loginForm = screen.getByTestId("login");
    expect(loginForm).toBeInTheDocument();
  });

  test('renders SignupForm when content is "signUpForm"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Banner content="signUpForm" />
        </BrowserRouter>
      </Provider>
    );
    const signupForm = screen.getByTestId("signup-form");
    expect(signupForm).toBeInTheDocument();
  });
});
