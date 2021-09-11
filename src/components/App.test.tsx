import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

describe('Testing Routes', () => {
  test('Add Kid profile route renders properly', () => {
    const history = createMemoryHistory();
    history.push('/kid');
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByText('Add Kid'));
    expect(screen.getByText('Report')).toBeInTheDocument();
  });
});
