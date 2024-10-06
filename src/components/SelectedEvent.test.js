import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectedEvent from './SelectedEvent';

const mockEvent = {
  id: 1,
  event_name: 'Test Event',
  event_category: 'Workshop',
  start_time: '2022-12-22 10:00:00',
  end_time: '2022-12-22 11:00:00',
};


test('renders event details correctly', () => {
  render(<SelectedEvent event={mockEvent} onActionButtonClick={jest.fn()} />);

  expect(screen.getByText(mockEvent.event_name)).toBeInTheDocument();
  expect(screen.getByText(mockEvent.event_category)).toBeInTheDocument();
});


test('calls onActionButtonClick on button click', () => {
  const mockOnActionButtonClick = jest.fn();
  render(<SelectedEvent event={mockEvent} onActionButtonClick={mockOnActionButtonClick} />);

  const button = screen.getByRole('button');
  console.log(button);

  fireEvent.click(button);

  expect(mockOnActionButtonClick).toHaveBeenCalledWith(mockEvent.id);
});