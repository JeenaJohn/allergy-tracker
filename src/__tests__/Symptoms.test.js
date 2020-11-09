import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Symptoms from "../Symptoms";

jest.mock("../ListSymptoms", () => {
  const ListSymptoms = () => <div />;
  return ListSymptoms;
});

jest.mock("../firebase", () => {
  const data = {
    1: { rash: true, itchLevel: "2", itchTime: "20:00", notes: "Itchy" },
    2: { rash: false, itchLevel: "8", itchTime: "12:00", notes: "Itchy" },
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

describe("Symptoms component renders properly", () => {
  beforeEach(() => {
    render(<Symptoms />);
  });

  afterEach(cleanup);

  test("Symptom header is displayed ", () => {
    expect(
      screen.getByText("Let's track Symptoms through out the day")
    ).toBeInTheDocument();
  });

  test("Input checkbox for rashes exists", () => {
    const checkbox = screen.getByLabelText("Are there any rashes?");
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox, true);
    userEvent.click(screen.getByText("Save"));
  });

  test("Input checkbox for Itch Level exists", () => {
    const input = screen.getByLabelText("Itch Level (scale of 0 - 10)");
    expect(input).toBeInTheDocument();
    userEvent.type(input, "3");
    userEvent.click(screen.getByText("Save"));
  });

  test("Input element for entering time exists", () => {
    const input = screen.getByLabelText("What was the time when it was itchy?");
    expect(input).toBeInTheDocument();
    userEvent.type(input, "3:00");
    userEvent.click(screen.getByText("Save"));
  });

  test("Input element for entering notes exists", () => {
    const input = screen.getByText("Notes");
    expect(input).toBeInTheDocument();
    // userEvent.type(input, "Some notes");
    // userEvent.click(screen.getByText("Save"));
  });

  test("'Save' button exists", () => {
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
  });

  test("Symptoms already added header is displayed ", () => {
    expect(
      screen.getByText("Symptoms already added for the day")
    ).toBeInTheDocument();
  });
});
