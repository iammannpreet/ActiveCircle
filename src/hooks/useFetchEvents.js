import { useState, useEffect } from 'react';
import { fetchEvents, addEvent, deleteEvent } from '../services/eventService'; // Assuming you have event services

const useFetchEvents = (apiUrl) => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        type: '',
        location: '',
        organizer: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch events from the backend
        fetchEvents(apiUrl)
            .then(setEvents)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [apiUrl]);

    // Function to handle adding a new event
    const handleAddEvent = (newEvent) => {
        addEvent(newEvent)
            .then((data) => setEvents([...events, data]))
            .catch((error) => console.error('Error adding event:', error));
    };

    // Function to handle deleting an event
    const handleDeleteEvent = (id) => {
        deleteEvent(id)
            .then(() => setEvents(events.filter(event => event._id !== id)))
            .catch((err) => setError(err.message));
    };

    return { events, loading, error, newEvent, setNewEvent, handleAddEvent, handleDeleteEvent };
};

export default useFetchEvents;
