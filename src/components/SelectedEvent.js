import { convertTime } from "../common/utils";

export default function SelectedEvent(props) {
    return (
        <div className="event-card" data-testid="selected-event">
            <h4>{props.event.event_name}</h4>
            <h5>{props.event.event_category}</h5>
            <h5>{convertTime(props.event.start_time)} - {convertTime(props.event.end_time)}</h5>
            <button className="deselect-button" onClick={() => props.onActionButtonClick(props.event.id)}>Remove</button>
        </div>
    );
}