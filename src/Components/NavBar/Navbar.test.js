import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import Navbar from "./Navbar";
import userEvent from "@testing-library/user-event";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe("Navbar redirections", () => {
  test("Home icon clicked must navigate to home page", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const homeIcon = screen.getByTestId("homeAvatar");
    userEvent.click(homeIcon);

    // const welcomeText = screen.getByText(/Time sheet/);
    // expect(welcomeText).toBeInTheDocument();
  });
});
