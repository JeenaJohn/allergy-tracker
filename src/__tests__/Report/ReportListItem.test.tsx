import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { ReportListItem } from '../../components/Report/ReportListItem';

const date = '2020-09-17';
const symptoms = [
  {
    id: '1',
    rash: true,
    itchLevel: 2,
    itchTime: '20:00',
    notes: 'Itchy',
  },
  {
    id: '2',
    rash: false,
    itchLevel: 8,
    itchTime: '12:00',
    notes: 'Itchy',
  },
];

const food = {
  '1': { breakfast: 'Oats', lunch: 'Rice', dinner: 'Sandwich', snacks: 'Banana' },
};

const additionalData = {
  '1': { ac: true, nails: true, outdoor: 'playground', notes: 'Itchy' },
};

jest.mock('../../components/Report/ReportListSymptoms', () => {
  const ReportListSymptoms = () => <div />;
  return ReportListSymptoms;
});

describe('ReportListItem component renders properly', () => {
  beforeEach(() => {
    render(
      <ReportListItem
        date={date}
        symptoms={symptoms}
        food={food}
        additionalData={additionalData}
      />
    );
  });

  afterEach(cleanup);

  test('Entry for breakfast exists', () => {
    expect(screen.getByText('Breakfast:')).toBeInTheDocument();
    expect(screen.getByText('Oats')).toBeInTheDocument();
  });

  test('Entry for lunch exists', () => {
    expect(screen.getByText('Lunch:')).toBeInTheDocument();
    expect(screen.getByText('Rice')).toBeInTheDocument();
  });

  test('Entry for dinner exists', () => {
    expect(screen.getByText('Dinner:')).toBeInTheDocument();
    expect(screen.getByText('Sandwich')).toBeInTheDocument();
  });

  test('Entry for snacks exists', () => {
    expect(screen.getByText('Snacks:')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  test('Entry for A/C exists', () => {
    expect(screen.getByText('A/C On?')).toBeInTheDocument();
  });

  test('Entry for Nails exists', () => {
    expect(screen.getByText('Nails Trimmed?')).toBeInTheDocument();
  });

  test('Entry for Outdoor Activity exists', () => {
    expect(screen.getByText('Outdoor Activity:')).toBeInTheDocument();
    expect(screen.getByText('playground')).toBeInTheDocument();
  });

  test('Entry for notes exists', () => {
    expect(screen.getByText('Additional Notes:')).toBeInTheDocument();
    expect(screen.getByText('Itchy')).toBeInTheDocument();
  });
});
