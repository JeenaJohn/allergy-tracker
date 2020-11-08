import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import MyAllergy from "../MyAllergy";

jest.mock("../Symptoms", () => {
  const Symptoms = () => <div />;
  return Symptoms;
});

jest.mock("../Food", () => {
  const Food = () => <div />;
  return Food;
});

jest.mock("../AdditionalData", () => {
  const AdditionalData = () => <div />;
  return AdditionalData;
});


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

describe("Diary component renders properly", () => {
  beforeEach(() => {
    render(<MyAllergy />);
    
  });

  afterEach(cleanup);


   test("List of kids are displayed ", () => {
    expect(screen.getByText("Kid1")).toBeInTheDocument();
    expect(screen.getByText("Kid2")).toBeInTheDocument();
   });

  test("Input field to select Date exists ", () => {
    const input = screen.getByText("Date");
    expect(input).toBeInTheDocument();
  
  });

  

});
