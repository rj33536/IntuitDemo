import { convertTime, getDate } from "../common/utils";

export default function SelectedEvent(props) {
    return (
        <div className="event-card" data-testid="selected-event">
            <h3>{props.event.event_name}</h3>
            <p>Category: {props.event.event_category}</p>
            <p>Date: {getDate(props.event.start_time)}</p>
            <p>{convertTime(props.event.start_time)} - {convertTime(props.event.end_time)}</p>
            <div className="btn-container">
                <button className="deselect-button" onClick={() => props.onActionButtonClick(props.event.id)}>Remove</button>
            </div>
        </div>
    );
}