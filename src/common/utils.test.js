import { convertTime, doTimeRangesOverlap, localSavedEvents, localSavedUser } from '../common/utils';

test('converts ISO time to formatted time', () => {
  const isoTime = '2023-12-31 15:30:00';
  const formattedTime = convertTime(isoTime);
  expect(formattedTime).toBe('3:30 PM');
});

test('handles midnight correctly', () => {
  const isoTime = '2023-12-31 00:00:00';
  const formattedTime = convertTime(isoTime);
  expect(formattedTime).toBe('12:0 AM');
});

test('detects overlapping time ranges', () => {
  const startTime1 = '2023-12-31 10:00:00';
  const endTime1 = '2023-12-31 12:00:00';
  const startTime2 = '2023-12-31 11:30:00';
  const endTime2 = '2023-12-31 13:00:00';

  const isOverlapping = doTimeRangesOverlap(startTime1, endTime1, startTime2, endTime2);
  expect(isOverlapping).toBe(true);
});

test('detects non-overlapping time ranges', () => {
  const startTime1 = '2023-12-31 10:00:00';
  const endTime1 = '2023-12-31 12:00:00';
  const startTime2 = '2023-12-31 13:30:00';
  const endTime2 = '2023-12-31 15:00:00';

  const isOverlapping = doTimeRangesOverlap(startTime1, endTime1, startTime2, endTime2);
  expect(isOverlapping).toBe(false);
});


test('returns empty array when no events are saved', () => {
  localStorage.removeItem('selectedEvents');
  const selectedEvents = localSavedEvents();
  expect(selectedEvents).toEqual([]);
});

test('retrieves saved events from localStorage', () => {
  localStorage.setItem('selectedEvents', JSON.stringify([{ id: 1, name: 'Event 1' }]));
  const selectedEvents = localSavedEvents();
  expect(selectedEvents).toEqual([{ id: 1, name: 'Event 1' }]);
});

test('returns null when no user is saved', () => {
  localStorage.removeItem('username');
  const username = localSavedUser();
  expect(username).toBeNull();
});

test('retrieves saved username from localStorage', () => {
  localStorage.setItem('username', 'john_doe');
  const username = localSavedUser();
  expect(username).toBe('john_doe');
});