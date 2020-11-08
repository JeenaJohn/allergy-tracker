// import React from "react";
// import { render, screen, cleanup } from "@testing-library/react";
// import ReportListView from "../ReportListView";

// const key = 1;
// const symptom = {id:1, rash: true, itchLevel: "2", itchTime: "20:00", notes: "I feel Itchy" };


// jest.mock("../ReportListItem", () => {
//   const ReportListItem = () => <div />;
//   return ReportListItem;
// });

// jest.mock("../BarChart", () => {
//   const BarChart = () => <div />;
//   return BarChart;
// });

// jest.mock("../firebase", () => {
//     const data = {
//       1: { rash: true, itchLevel: "2", itchTime: "20:00", notes: "Itchy" },
//       2: { rash: false, itchLevel: "8", itchTime: "12:00", notes: "Itchy" },
//     };
  
//     const snapshot = {
//       val: () => data,
//       exportVal: () => data,
//       exists: jest.fn(() => true),
//     };
  
//     const returnVal = {
//       database: jest.fn().mockReturnValue({
//         ref: jest.fn().mockReturnThis(),
//         on: jest.fn((eventType, callback) => callback(snapshot)),
//       }),
//     };
  
//     return returnVal;
//   });

// describe("ReportListView component renders properly", () => {
//   beforeEach(() => {
//     render(<ReportListView />);
//   });

//   afterEach(cleanup);


//   test("Rashes displays the correct value", () => {
//     const checkbox = screen.getByText("Rashes?");
//     expect(checkbox).toBeTruthy();
//   });

//   test("Itch Level exists and displays the correct value", () => {
//     expect(screen.getByText("Itch Level:")).toBeInTheDocument();
//     expect(screen.getByText("2")).toBeInTheDocument();
//   });

//   test("Time exists and displays the correct value", () => {
//    expect(screen.getByText("Time when it was itchy?")).toBeInTheDocument();
//    // expect(screen.getByText(/20:00/)).toBeInTheDocument();
//   });

//   test("Notes exists and displays the correct value", () => {
//     expect(screen.getByText("Notes")).toBeInTheDocument();
//     expect(screen.getByText("I feel Itchy")).toBeInTheDocument();
//   });




// });
