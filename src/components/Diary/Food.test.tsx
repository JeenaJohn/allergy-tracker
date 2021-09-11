import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Food from "./Food";

jest.mock("../../firebase", () => {
  const data = {
    1: {
      breakfast: "Oats",
      lunch: "Rice",
      dinner: "Sandwich",
      snacks: "Banana",
    },
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
    }),
  };

  return returnVal;
});

describe("Food section renders properly", () => {
  beforeEach(() => {
    render(<Food userID={null}
      kidId={null}
      date={null}
      date_yyyy_mm={null}/>);
  });

  afterEach(cleanup);

  test(" Header is displayed ", () => {
    expect(screen.getByText("Let's track Food")).toBeInTheDocument();
  });

  test("Input element for entering breakfast exists", () => {
    const input = screen.getByLabelText("Breakfast");
    expect(input).toBeInTheDocument();
    userEvent.type(input, "Eggs");
    userEvent.click(screen.getByText("Save"));
  });

  test("Existing entry for breakfast is displayed correctly", () => {
    const input: HTMLInputElement = screen.getByLabelText("Breakfast") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Oats");
  });

  test("Input element for entering lunch exists", () => {
    const input = screen.getByLabelText("Lunch");
    expect(input).toBeInTheDocument();
    userEvent.type(input, "Salad");
    userEvent.click(screen.getByText("Save"));
  });

  test("Existing entry for lunch is displayed correctly", () => {
    const input: HTMLInputElement = screen.getByLabelText("Lunch") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Rice");
  });

  test("Input element for entering dinner exists", () => {
    const input = screen.getByLabelText("Dinner");
    expect(input).toBeInTheDocument();
    userEvent.type(input, "Pasta");
    userEvent.click(screen.getByText("Save"));
  });

  test("Existing entry for dinner is displayed correctly", () => {
    const input: HTMLInputElement = screen.getByLabelText("Dinner") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Sandwich");
  });

  test("Input element for entering snacks exists", () => {
    const input = screen.getByLabelText("Snacks");
    expect(input).toBeInTheDocument();
    userEvent.type(input, "Apple");
    userEvent.click(screen.getByText("Save"));
  });

  test("Existing entry for snacks is displayed correctly", () => {
    const input: HTMLInputElement = screen.getByLabelText("Snacks") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Banana");
  });

  test("'Save' button exists", () => {
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
  });
});
