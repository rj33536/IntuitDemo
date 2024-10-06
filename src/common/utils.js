export function convertTime(isoTime) {
    const date = new Date(isoTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${period}`;
}

export function doTimeRangesOverlap(startTime1, endTime1, startTime2, endTime2) {
    // Convert times to milliseconds for easier comparison
    const startTime1Ms = new Date(startTime1).getTime();
    const endTime1Ms = new Date(endTime1).getTime();
    const startTime2Ms = new Date(startTime2).getTime();
    const endTime2Ms = new Date(endTime2).getTime();

    // Check if the start time of one range is before the end time of the other range
    // and vice versa
    return (startTime1Ms <= endTime2Ms && endTime1Ms >= startTime2Ms) ||
        (startTime2Ms <= endTime1Ms && endTime2Ms >= startTime1Ms);
}


export const localSavedEvents = () => {
    const selectedEventsValue = localStorage.getItem("selectedEvents");
    if (!selectedEventsValue) return [];
    const selected = JSON.parse(selectedEventsValue);
    return selected;
}

export const localSavedUser = () => {
    const username = localStorage.getItem("username");
    return username;
}