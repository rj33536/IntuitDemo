import { convertTime } from "../common/utils";

export default function Event(props) {
    const getTimeRange = () => {
        return convertTime(props.event.start_time) + " - " + convertTime(props.event.end_time);
    }
    const isDisabled = props.selectedEvents.findIndex(selectedEvent => selectedEvent.id === props.event.id) !== -1;

    return (
        <div data-testid="event" className="event-card" style={{ backgroundColor: isDisabled ? "grey" : "white" }}>
            <h4>{props.event.event_name}</h4>
            <h5>{props.event.event_category}</h5>
            <h5 className="event-time">{getTimeRange()}</h5>
            <button className={isDisabled ? "disabled-select-button" : "select-button"} disabled={isDisabled} onClick={() => props.onActionButtonClick(props.event.id)}>Select</button>
        </div>
    );
}