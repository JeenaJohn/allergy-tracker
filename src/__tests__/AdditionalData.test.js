import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdditionalData from "../AdditionalData";


jest.mock("../firebase", () => {
  const data = {
    1: { ac: true, nails: true, outdoor: "playground", notes: "Itchy" },
  };

  const snapshot = {
    val: () => data,
    exportVal: () => data,
    exists: jest.fn(() => true),
  };

  const returnVal = {
    database: jest.fn().mockReturnValue({
      ref: jest.fn().mockReturnThis(),
      on: jest.fn((eventType, callback) => callback(snapshot)),
      update: jest.fn()
    }),
  };

  return returnVal;
});

describe("AdditionalData section renders properly", () => {
  beforeEach(() => {
    render(<AdditionalData />);
  });

  afterEach(cleanup);

  test("Header is displayed ", () => {
    expect(screen.getByText("Some more data to track")).toBeInTheDocument();
  });

  test("Input checkbox for A/C On exists", () => {
    const checkbox = screen.getByLabelText("Was A/C On?");
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox, true);
    userEvent.click(screen.getByText("Save"));
  });

  test("Existing entry for  A/C is displayed correctly", () => {
    const checkbox = screen.getByLabelText("Was A/C On?");
    expect(checkbox).toBeTruthy();
  });

  test("Input checkbox for Nails trimmed exists", () => {
    const checkbox = screen.getByLabelText("Kid's nails are trimmed?");
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox, true);
    userEvent.click(screen.getByText("Save"));
  });

  test("Existing entry for  Nails trimmed is displayed correctly", () => {
    const checkbox = screen.getByLabelText("Kid's nails are trimmed?");
    expect(checkbox).toBeTruthy();
  });

  test("Input element for entering Outdoor activities exists", () => {
    const input = screen.getByLabelText("Outdoor Activities?");
    expect(input).toBeInTheDocument();
    userEvent.type(input, "Swimming");
    userEvent.click(screen.getByText("Save"));
  });

  test("Existing entry for Outdoor activities is displayed correctly", () => {
    const input = screen.getByLabelText("Outdoor Activities?");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("playground");
  });

  test("Input element for entering additional notes exists", () => {
    const input = screen.getByText("Additional notes");
    expect(input).toBeInTheDocument();
  });

  test("'Save' button exists", () => {
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
  });
});
