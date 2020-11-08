import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import AdditionalData from "../AdditionalData";

describe("AdditionalData section renders properly", () => {
    beforeEach(() => {
      render(<AdditionalData/>);
    });
  
    afterEach(cleanup);
  
    test("Header is displayed ", () => {
      expect(
        screen.getByText("Some more data to track")
      ).toBeInTheDocument();
    });
  
    test("Input checkbox for A/C On exists", () => {
      const checkbox = screen.getByLabelText("Was A/C On?");
      expect(checkbox).toBeInTheDocument();
    });
  
    test("Input checkbox for Nails trimmed exists", () => {
      const input = screen.getByLabelText("Kid's nails are trimmed?");
      expect(input).toBeInTheDocument();
    });
  
    test("Input element for entering Outdoor activities exists", () => {
      const input = screen.getByLabelText("Outdoor Activities?");
      expect(input).toBeInTheDocument();
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
  