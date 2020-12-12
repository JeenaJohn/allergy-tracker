import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import {BarChart} from "../../components/Report/BarChart";

const date_yyyy_mm = "2020-09";
const graphData = [
  { date: "2020-09-17", itchLevel: 2 },
  { date: "2020-09-02", itchLevel: 5 },
];

describe("Barchart renders properly", () => {
  beforeEach(() => {
    render(<BarChart date_yyyy_mm={date_yyyy_mm} graphData={graphData} />);
  });

  afterEach(cleanup);

  test("BarChart title is displayed correctly", () => {
    expect(
      screen.getByText("Allergy Symptoms for the month")
    ).toBeInTheDocument();
  });
});
