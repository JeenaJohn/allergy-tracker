import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Report from "./Report";

jest.mock("../../components/Report/ReportListView", () => {
  const ReportListView = () => <div />;
  return ReportListView;
});

jest.mock("../../firebase", () => {
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

describe("Report Component renders properly", () => {
  beforeEach(() => {
    render(<Report userID={"8xztH1zd2cRAPqokhLPzBv37ws00"} />);
  });

  afterEach(cleanup);

  test("Already existing kids are displayed ", () => {
    expect(screen.getByText("Kid1")).toBeInTheDocument();
    expect(screen.getByText("Kid2")).toBeInTheDocument();
  });

  test("Input field to choose month exists ", () => {
    const monthInput = screen.getByTestId("month-selector");
    expect(monthInput).toBeInTheDocument();
  });
});
