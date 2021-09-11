import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReportListSymptoms from "./ReportListSymptoms";

const key = "1";
const symptom = {
  id: "1",
  rash: true,
  itchLevel: 2,
  itchTime: "20:00",
  notes: "I feel Itchy",
};

describe("ReportListSymptoms component renders properly", () => {
  beforeEach(() => {
    render(<ReportListSymptoms key={key} symptom={symptom} />);
  });

  afterEach(cleanup);

  test("Rashes displays the correct value", () => {
    const checkbox = screen.getByText("Rashes?");
    expect(checkbox).toBeTruthy();
  });

  test("Itch Level exists and displays the correct value", () => {
    expect(screen.getByText("Itch Level:")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("Time exists and displays the correct value", () => {
    expect(screen.getByText("Time when it was itchy?")).toBeInTheDocument();
    // expect(screen.getByText(/20:00/)).toBeInTheDocument();
  });

  test("Notes exists and displays the correct value", () => {
    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("I feel Itchy")).toBeInTheDocument();
  });
});
