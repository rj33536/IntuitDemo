import { convertTime, getDate } from "../common/utils";

export default function Event(props) {
    const isDisabled = props.selectedEvents.findIndex(selectedEvent => selectedEvent.id === props.event.id) !== -1;

    return (
        <div data-testid="event" className={`event-card ${isDisabled ? "disabled" : ""}`}>
            <h3>{props.event.event_name}</h3>
            <p>Category: {props.event.event_category}</p>
            <p>Date: {getDate(props.event.start_time)}</p>
            <p>{convertTime(props.event.start_time)} - {convertTime(props.event.end_time)}</p>
            <div className="btn-container">
                <button className={isDisabled ? "disabled-select-button" : "select-button"} disabled={isDisabled} onClick={() => props.onActionButtonClick(props.event.id)}>Select</button>
            </div>
        </div>
    );
}