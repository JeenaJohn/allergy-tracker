import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import App from '../components/App';

describe("Testing Routes", () => {
  test.skip('renders App - Home page', () => {
    const { getByText } = render(<App/>);
    expect(screen.getByText("Start Tracking")).toBeInTheDocument()
    //screen.debug();
    // const linkElement = getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });
  
  test('Add Kid profile route renders properly', () => {
    const history = createMemoryHistory()
    history.push('/kid')
     render(
      <Router history={history}>
        <App />
      </Router>
    )
    
 
  const leftClick = { button: 0 }
   userEvent.click(screen.getByText("Add Kid"))

  // screen.debug()
  
    // check that the content changed to the new page
    expect(screen.getByText("Report")).toBeInTheDocument()
  
   //userEvent.click(screen.getByText("Diary"));
  })
  

 })
