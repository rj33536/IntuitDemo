import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {convertTime} from '../common/utils'
import Event from './Event';

const mockEvent = {
  id: 1,
  event_name: 'Test Event',
  event_category: 'Workshop',
  start_time: '2022-12-22 10:00:00',
  end_time: '2022-12-22 11:00:00',
};

const mockSelectedEvents = [];

test('renders event details correctly', () => {
  render(<Event event={mockEvent} selectedEvents={mockSelectedEvents} onActionButtonClick={jest.fn()} />);

  expect(screen.getByText(mockEvent.event_name)).toBeInTheDocument();
  expect(screen.getByText("Category: "+mockEvent.event_category)).toBeInTheDocument();
});

test('disables button when event is selected', () => {
  const selectedEvents = [mockEvent];
  render(<Event event={mockEvent} selectedEvents={selectedEvents} onActionButtonClick={jest.fn()} />);

  const button = screen.getByRole('button');
  expect(button).toBeDisabled();
  expect(button).toHaveClass('disabled-select-button'); // Adjust class name if needed
});

test('enables button when event is not selected', () => {
  render(<Event event={mockEvent} selectedEvents={[]} onActionButtonClick={jest.fn()} />);

  const button = screen.getByRole('button');
  expect(button).not.toBeDisabled();
  expect(button).toHaveClass('select-button'); // Adjust class name if needed
});

test('calls onActionButtonClick on button click', () => {
  const mockOnActionButtonClick = jest.fn();
  render(<Event event={mockEvent} selectedEvents={[]} onActionButtonClick={mockOnActionButtonClick} />);

  const button = screen.getByRole('button');
  fireEvent.click(button);

  expect(mockOnActionButtonClick).toHaveBeenCalledWith(mockEvent.id);
});