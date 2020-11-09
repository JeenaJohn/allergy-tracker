import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

describe("App component renders properly", () => {
  afterEach(cleanup);

  test("renders App - Home page", () => {
    const { getByText } = render(<App />);
    expect(screen.getByText("Start Tracking")).toBeInTheDocument();
  });

  test("Default route renders properly", () => {
    const route = "/";
    renderWithRouter(<App />, { route });
    const button = screen.getByText("Start Tracking");
    expect(button).toBeInTheDocument();
  });

  test("Kid route renders properly", () => {
    const route = "/kid";
    renderWithRouter(<App />, { route });
    const header = screen.getByText("Add Kid Profile");
    expect(header).toBeInTheDocument();
  });

  test("Diary route renders properly", () => {
    const route = "/diary";
    renderWithRouter(<App />, { route });
    const header = screen.getByTestId("diary-header");
    expect(header).toBeInTheDocument();
  });

  test("Report route renders properly", () => {
    const route = "/report";
    renderWithRouter(<App />, { route });
    const header = screen.getByTestId("report-header");
    expect(header).toBeInTheDocument();
  });
});
