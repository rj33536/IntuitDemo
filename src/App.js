import { useState, useEffect } from "react";
import Event from "./components/Event";
import LoginRegister from "./components/Login";
import SelectedEvent from "./components/SelectedEvent";
import { fetchEvents } from "./services/EventService";
import { login } from "./services/UserService";
import { doTimeRangesOverlap, localSavedEvents, localSavedUser } from "./common/utils";
import './App.css';

function App() {

    const [events, setEvents] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState(localSavedEvents());
    const [username, setUsername] = useState(localSavedUser());
    const selectEvent = (eventId) => {
        if (selectedEvents.length == 3) {
            alert("Can't select more than 3 events");
            return;
        }
        const index = events.findIndex(event => event.id === eventId);
        const event = events[index];
        for (let selectedEvent of selectedEvents) {
            if (doTimeRangesOverlap(selectedEvent.start_time, selectedEvent.end_time, event.start_time, event.end_time)) {
                alert("Duration overlaps");
                return
            }
        }

        setSelectedEvents([...selectedEvents, event]);
    }
    const removeEvent = (eventId) => {
        setSelectedEvents([...selectedEvents.filter(event => event.id !== eventId)]);
    }

    useEffect(() => {
        fetchEvents().then(events => setEvents(events)).catch(e => console.log(e));
        const value = localSavedUser();
        if (value) {
            login(value).then(response => {
                if (response) {
                    updateUser(value);
                }
            })
        }

    }, []);


    useEffect(() => {
        localStorage.setItem("selectedEvents", JSON.stringify(selectedEvents));
    }, [selectedEvents]);

    const updateUser = (value) => {
        localStorage.setItem("username", value);
        setUsername(value);
    };

    if (!username) {
        return <LoginRegister updateUser={updateUser} />
    }
    return (
        <div className="app-container">
            <h1>Sports Events Registration</h1>
            <div className="App">
            
            <div className="events-list">
                <h2>All events( {events.length})</h2>
                <div className="cards">
                    {events.map(event => <Event data-testid="event" id={`event-${event.id}`}
                        selectedEvents={selectedEvents} actionButtonLabel={"Select"} onActionButtonClick={selectEvent} key={event.id} event={event} />)}
                </div>
            </div>
            <div className="events-list">
                <h2>Selected events( {selectedEvents.length})</h2>
                <div className="selected-events-cards">
                    {selectedEvents.map(event => <SelectedEvent id={`selected-event-${event.id}`}
                        actionButtonLabel={"Remove"} onActionButtonClick={removeEvent} key={event.id} event={event} />)}
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default App;
