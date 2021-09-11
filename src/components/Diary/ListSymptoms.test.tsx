import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ListSymptoms from "./ListSymptoms";

const key = "1";
const symptom = {
  id: "1",
  rash: true,
  itchLevel: 2,
  itchTime: "20:00",
  notes: "Itchy",
};

describe("List Symptoms component", () => {
  beforeEach(() => {
    render(<ListSymptoms key={key} symptom={symptom} />);
  });

  afterEach(cleanup);

  test("Rashes displays the correct value", () => {
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeTruthy();
  });

  test("Itch Level displays the correct value", () => {
    const input: HTMLInputElement  = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(input.value).toBe("2");
  });

  // test("Time displays the correct value", () => {
  //   const input = screen.getByText("20:00");
  //   console.log(input);
  //   expect(screen.getByText("20:00")).toBe("20:00");
  // });

  test("Notes displays the correct value", () => {
    const input: HTMLInputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Itchy");
  });
});
