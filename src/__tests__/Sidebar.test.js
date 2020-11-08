import React from "react";
import { render, screen } from "@testing-library/react";


import Sidebar from "../Sidebar";

describe("Sidebar component", () => {
  beforeEach(() => {
    render(<Sidebar />);
  });

  test("Link to 'Home' exists' ", () => {
    const link = screen.getByText("Home");
    expect(link.href).toBe("http://localhost/");
  });

  test("Link to 'Add Kid' exists' ", () => {
    const link = screen.getByText("Add Kid");
    expect(link.href).toContain("/kid");
  });

  test("Link to 'Diary' exists' ", () => {
    const link = screen.getByText("Diary");
    expect(link.href).toContain("/diary");
  });

  test("Link to 'Report' exists' ", () => {
    const link = screen.getByText("Report");
    expect(link.href).toContain("/report");
  });
});
