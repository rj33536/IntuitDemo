import { useState, useEffect } from "react";
import Event from "./components/Event";
import LoginRegister from "./components/Login";
import SelectedEvent from "./components/SelectedEvent";
import { fetchEvents } from "./services/EventService";
import { login, register, updateEvents } from "./services/UserService";
import { doTimeRangesOverlap, localSavedEvents, localSavedUser } from "./common/utils";
import './App.css';

function App() {

    const [events, setEvents] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
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
        const updatedSelectedEvents = [...selectedEvents, event];
        setSelectedEvents(updatedSelectedEvents);
        updateEvents(username, updatedSelectedEvents.map(selectEvent => selectEvent.id));
    }
    const removeEvent = (eventId) => {
        const updatedSelectedEvents = [...selectedEvents.filter(event => event.id !== eventId)];
        setSelectedEvents(updatedSelectedEvents);
        updateEvents(username, updatedSelectedEvents.map(selectEvent => selectEvent.id));
    }

    const hydrateEvents = (eventIds, events) => {
        const eventMap = eventIds.map(id => events.find(event => event.id === id));
        setSelectedEvents(eventMap);
    }

    const tryLoginAndHydrate = async (username) => {
        try {
            const events = await fetchEvents();
            setEvents(events);
            const resp = await login(username);
            const eventIds = JSON.parse(resp.events);
            updateUser(resp.username);
            hydrateEvents(eventIds, events);
        } catch (e) {
            localStorage.clear();
            alert("Couldn't login");
        }

    }

    const setup = async () => {
        const value = localSavedUser();
        if (value) {
            tryLoginAndHydrate(value);
        }
    }

    const onRegister = async (username) => {
        try {
            const events = await fetchEvents();
            setEvents(events);
            const resp = await register(username);
            updateUser(resp.username);
        } catch (e) {
            localStorage.clear();
            alert("Couldn't login");
        }
    }

    useEffect(() => {
        setup()
    }, []);

    const updateUser = (value) => {
        localStorage.setItem("username", value);
        setUsername(value);
    };

    if (!username) {
        return <LoginRegister onLogin={tryLoginAndHydrate} onRegister={onRegister} />
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
