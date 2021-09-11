import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import Sidebar from "../components/Sidebar";

describe("Sidebar component", () => {
  beforeEach(() => {
    render(<Sidebar />);
  });

  afterEach(cleanup);

  test("Link to 'Home' exists' ", () => {
    const link: HTMLLinkElement = screen.getByText("Home") as HTMLLinkElement ;
    expect(link.href).toBe("http://localhost/");
  });

  test("Link to 'Add Kid' exists' ", () => {
    const link: HTMLLinkElement = screen.getByText("Add Kid") as HTMLLinkElement;
    expect(link.href).toContain("/kid");
  });

  test("Link to 'Diary' exists' ", () => {
    const link: HTMLLinkElement = screen.getByText("Diary") as HTMLLinkElement;
    expect(link.href).toContain("/diary");
  });

  test("Link to 'Report' exists' ", () => {
    const link: HTMLLinkElement = screen.getByText("Report") as HTMLLinkElement;
    expect(link.href).toContain("/report");
  });
});
