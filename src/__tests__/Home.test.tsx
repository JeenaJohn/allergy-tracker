import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Home} from "../Home";

describe("Home component", () => {
  beforeEach(() => {
    render(<Home />);
  });

  afterEach(cleanup);

  test("Heading has Track My Allergy", () => {
    const heading = screen.getByText("Track My Allergy");
    expect(heading).toBeInTheDocument();
  });

  test("Button 'Start Tracking' exists", () => {
    const link = screen.getByRole("link", { name: "Start Tracking" });
    expect(link).toBeInTheDocument();
  });

  test("Clicking 'Start Tracking' ", () => {
    const link = screen.getByText("Start Tracking");
    expect(link.href).toContain("/diary");
    userEvent.click(link);
  });
});
