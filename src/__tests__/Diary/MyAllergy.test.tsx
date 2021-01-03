import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import MyAllergy from '../../components/Diary/MyAllergy';
import { Symptoms } from '../../components/Diary/Symptoms';
import { Food } from '../../components/Diary/Food';
import { AdditionalData } from '../../components/Diary/AdditionalData';

jest.mock('../../components/Diary/Symptoms', () => {
  const Symptoms = jest.fn(() => <div />);
  return Symptoms;
});

jest.mock('../../components/Diary/Food', () => {
  const Food = jest.fn(() => <div />);
  return Food;
});

jest.mock('../../components/Diary/AdditionalData', () => {
  const AdditionalData = jest.fn(() => <div />);
  return AdditionalData;
});

jest.mock('../../firebase', () => {
  const data = { 1: { kidName: 'Kid1' }, 2: { kidName: 'Kid2' } };
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

describe('Diary component renders properly', () => {
  beforeEach(() => {
    render(<MyAllergy userID={'8xztH1zd2cRAPqokhLPzBv37ws00'} />);
  });

  afterEach(cleanup);

  test('List of kids are displayed ', () => {
    expect(screen.getByText('Kid1')).toBeInTheDocument();
    expect(screen.getByText('Kid2')).toBeInTheDocument();
  });

  test('Input field to select Date exists ', () => {
    const input = screen.getByText('Date');
    expect(input).toBeInTheDocument();
  });

  test('Symptoms component is called', () => {
    expect(Symptoms).toHaveBeenCalled();
  });

  test('Food component is called', () => {
    expect(Food).toHaveBeenCalled();
  });

  test('AdditionalData component is called', () => {
    expect(AdditionalData).toHaveBeenCalled();
  });
});
