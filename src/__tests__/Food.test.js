import React from 'react';
import { render } from '@testing-library/react';
import Food from '../Food'

describe("Food section renders properly", () => {
    test("Heading has Let's track Food", () => {
      const { getByText } = render(<Food />);
  
      const heading = getByText("Let's track Food");
      expect(heading).toBeInTheDocument();
    });
  
    test("Button 'Save' exists", () => {
      const { getByRole } = render(<Food />);
  
      const link = getByRole("button", { name: "Save" });
  
      expect(link).toBeInTheDocument();
    });
  
   
  });
  