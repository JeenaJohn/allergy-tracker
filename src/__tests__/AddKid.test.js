import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddKid from "../AddKid";


jest.mock("../firebase", () => {
  const data = { 1: { kidName: "Kid1" }, 2: { kidName: "Kid2" } };
  const snapshot = {
    val: () => data,
    exportVal: () => data,
    exists: jest.fn(() => true),
  };

  const returnVal = {
    database: jest.fn().mockReturnValue({
      ref: jest.fn().mockReturnThis(),
      on: jest.fn((eventType, callback) => callback(snapshot)),
    }),
  };

  return returnVal;
});

describe("Add Kid component", () => {
  beforeEach(() => {
    render(<AddKid />);
  });

  test("Already existing kids are displayed ", () => {
    expect(screen.getByText("Kid1")).toBeInTheDocument();
    expect(screen.getByText("Kid2")).toBeInTheDocument();
  });

  test("Input field to add new kid exists ", () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    userEvent.type(input, "Test kidname");
    userEvent.click(screen.getByText("Save"));
  });

});
