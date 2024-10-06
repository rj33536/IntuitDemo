import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { fetchEvents } from './services/EventService';
import { doTimeRangesOverlap, localSavedEvents, localSavedUser } from './common/utils';
import App from './App';

// Mock functions for services and utilities
jest.mock('./services/EventService');
jest.mock('./common/utils');
const mockEvents = [
    { id: 1, "event_name": "100m Race", "event_category": "Track", start_time: '2022-12-22 10:00:00', end_time: '2022-12-22 11:00:00' },
    {
        id: 2, "event_name": "200m Race",
        "event_category": "Track", start_time: '2022-12-22 10:00:00', end_time: '2022-12-22 13:00:00'
    },
    {
        id: 3, "event_name": "400m Relay",
        "event_category": "Track", start_time: '2022-12-22 14:00:00', end_time: '2022-12-22 15:00:00'
    },
    {
        id: 4, "event_name": "500m Relay",
        "event_category": "Track", start_time: '2022-12-22 15:00:00', end_time: '2022-12-22 16:00:00'
    },
    {
        id: 5, "event_name": "600m Relay",
        "event_category": "Track", start_time: '2022-12-22 16:00:00', end_time: '2022-12-22 17:00:00'
    },
];

describe('App component', () => {
    beforeEach(() => {
        // Mock successful event fetching
        fetchEvents.mockResolvedValue(mockEvents);
        localSavedUser.mockImplementation(() => "testuser");
        localSavedEvents.mockImplementation(() => []);
        jest.spyOn(window, 'alert').mockImplementation(() => { });

        // Mock doTimeRangesOverlap function
        doTimeRangesOverlap.mockImplementation((start1, end1, start2, end2) => {
            // Simulate overlapping time ranges
            return start1 < end2 && start2 < end1;
        });
    });


    test('renders Login page when not logged in', async () => {
        localSavedUser.mockImplementation(() => { });
        render(<App />);

        await waitFor(() => {
            mockEvents.forEach(event => {
                expect(screen.queryByText(event.event_name)).not.toBeInTheDocument();
            });
        });
    });

    test('renders events correctly', async () => {
        render(<App />);

        await waitFor(() => {
            mockEvents.forEach(event => {
                expect(screen.getByText(event.event_name)).toBeInTheDocument();
            });
        });
    });

    test('selects an event and displays alert on overlapping time', async () => {
        render(<App />);

        const allSelectButtons = await screen.findAllByText('Select');
        fireEvent.click(allSelectButtons[0]);
        fireEvent.click(allSelectButtons[1]);

        expect(window.alert).toHaveBeenCalledWith('Duration overlaps');
    });

    test('selects an event and displays alert on overlapping time', async () => {
        render(<App />);

        const allSelectButtons = await screen.findAllByText('Select');
        fireEvent.click(allSelectButtons[0]);
        fireEvent.click(allSelectButtons[2]);
        fireEvent.click(allSelectButtons[3]);
        fireEvent.click(allSelectButtons[4]);

        expect(window.alert).toHaveBeenCalledWith('Can\'t select more than 3 events');
    });

    test('selects a non-overlapping event and adds it to selected list', async () => {
        render(<App />);

        const allSelectButtons = await screen.findAllByText('Select');
        fireEvent.click(allSelectButtons[2]);
        fireEvent.click(allSelectButtons[1]);

        expect(window.alert).not.toHaveBeenCalled();

        const selectedEvents = await screen.findAllByTestId('selected-event');
        expect(selectedEvents).toHaveLength(2);
    });

    test('removes a selected event', async () => {
        render(<App />);

        const allSelectButtons = await screen.findAllByText('Select');
        fireEvent.click(allSelectButtons[2]);

        const removeButtons = await screen.findAllByText('Remove');
        expect(removeButtons).toHaveLength(1);
        fireEvent.click(removeButtons[0]);
        expect(screen.queryByText('Remove')).not.toBeInTheDocument();
    });
});
