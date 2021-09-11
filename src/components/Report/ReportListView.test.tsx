import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ReportListView } from './ReportListView';
//import { ReportListItem } from '../../components/Report/ReportListItem';
import BarChart  from './BarChart';

jest.mock('../../components/Report/ReportListItem', () => {
  //const ReportListItem = jest.fn(() => <div />);
  const ReportListItem = () => <div />;
  return ReportListItem;
});

jest.mock('../../components/Report/BarChart', () => {
  const BarChart = jest.fn(() => <div />);
  //const BarChart = () => <div />;
  return BarChart;
});

jest.mock('../../firebase', () => {
  const data = {
    '2020-09-17': {
      symptoms: [
        {
          id: '1',
          rash: true,
          itchLevel: '2',
          itchTime: '20:00',
          notes: 'Itchy',
        },
        {
          id: '2',
          rash: false,
          itchLevel: '8',
          itchTime: '12:00',
          notes: 'Itchy',
        },
      ],
      food: {
        breakfast: 'Oats',
        lunch: 'Rice',
        dinner: 'Sandwich',
        snacks: 'Banana',
      },
      additionalData: {
        ac: true,
        nails: true,
        outdoor: 'playground',
        notes: 'Itchy',
      },
    },
  };
  /* for testing no reported data scenario*/
  // const data = {};

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

describe('ReportListView component renders properly', () => {
  beforeEach(() => {
    render(
      <ReportListView userID={'8xztH1zd2cRAPqokhLPzBv37ws00'} kidId={'MHPzOncWLenSmxzZzix'} date_yyyy_mm={'2020-09'} />
    );
  });

  afterEach(cleanup);

  test('BarChart component is called', () => {
    expect(BarChart).toHaveBeenCalled();
  });

  // test("If there is no data reported for the month, user message is displayed", () => {
  //   expect(screen.getByText("No data reported for the selected month")).not.toBeInTheDocument();
  // });
});
