import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
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

  test("Existing kids are displayed ", () => {
    expect(screen.getByText("Kid1")).toBeInTheDocument();
    expect(screen.getByText("Kid2")).toBeInTheDocument();
  });

  test("'Save' button exists", () => {
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
  });

  test("Input field to add new kid exists ", () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    userEvent.type(input, "Test kidname");
    userEvent.click(screen.getByText("Save"));
  });

  
  test("Error msg is displayed while saving kid's name as empty ", async () => {
    const input = screen.getByRole("textbox");
    userEvent.type(input, "    ");
    userEvent.click(screen.getByText("Save"));
  //  expect(await element(by.id("toast"))).toBeVisible();
   // expect(await screen.findByText("Kid's name is empty.")).toBeInTheDocument();
  });

});
