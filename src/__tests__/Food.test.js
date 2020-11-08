import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
import Food from '../Food';

describe("Food section renders properly", () => {
    
  beforeEach(() => {
    render(<Food/>);
  });

  afterEach(cleanup);

  test(" Header is displayed ", () => {
    expect(
      screen.getByText("Let's track Food")
    ).toBeInTheDocument();
  });

  test("Input element for entering breakfast exists", () => {
    const input = screen.getByLabelText("Breakfast");
    expect(input).toBeInTheDocument();
  });

  test("Input element for entering lunch exists", () => {
    const input = screen.getByLabelText("Lunch");
    expect(input).toBeInTheDocument();
  });

  test("Input element for entering dinner exists", () => {
    const input = screen.getByLabelText("Dinner");
    expect(input).toBeInTheDocument();
  });

  test("Input element for entering snacks exists", () => {
    const input = screen.getByLabelText("Snacks");
    expect(input).toBeInTheDocument();

  });

  test("'Save' button exists", () => {
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
  });
});

  
  
  
  
  
  
  
  
  