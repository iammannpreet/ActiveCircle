import React, { useState } from 'react';
import useFetchEvents from '../hooks/useFetchEvents';
import { fetchLocationSuggestions, geocodeLocation } from '../utils/location'; // Import location utilities
import TypeDropdown from '../components/TypeDropdown'; // Import reusable dropdown component

// Initial event state
const initialEventState = {
    type: '',
    location: '',
    organizer: '',
    date: '',
    time: '',
    details: ''
};

const AddEventPage = () => {
    const { newEvent, setNewEvent, handleAddEvent } = useFetchEvents(process.env.REACT_APP_API_URL);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [locationSuggestions, setLocationSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });

        if (name === 'location' && value) {
            const suggestions = await fetchLocationSuggestions(value);
            setLocationSuggestions(suggestions);
        } else {
            setLocationSuggestions([]);
        }
    };

    const handleLocationSelect = (location) => {
        setNewEvent({ ...newEvent, location });
        setLocationSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dateTime = new Date(`${newEvent.date}T${newEvent.time}`);
            const { latitude, longitude } = await geocodeLocation(newEvent.location);

            const eventWithCoordsAndDate = {
                ...newEvent,
                latitude,
                longitude,
                date: dateTime,
            };

            await handleAddEvent(eventWithCoordsAndDate);
            setNewEvent(initialEventState);
            setError(null);
            setSuccessMessage('Event added successfully!');
        } catch (err) {
            setError('Failed to add event. Please check the location.');
            setSuccessMessage(null);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <TypeDropdown value={newEvent.type} onChange={handleInputChange} label="Event Type" />
                {/* Location with Autocomplete */}
                <label className="block mb-2">Location:</label>
                <input
                    type="text"
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    required
                />
                {locationSuggestions.length > 0 && (
                    <ul className="border border-gray-300 bg-white max-h-48 overflow-y-auto mb-4">
                        {locationSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleLocationSelect(suggestion.place_name)}
                            >
                                {suggestion.place_name}
                            </li>
                        ))}
                    </ul>
                )}
                {/* Date and Time Fields */}
                <label className="block mb-2">Date:</label>
                <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    min={today}
                    required
                />
                <label className="block mb-2">Time:</label>
                <input
                    type="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    required
                />
                {/* Other Fields */}
                <label className="block mb-2">Details:</label>
                <input
                    type="text"
                    name="details"
                    value={newEvent.details}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                />
                <label className="block mb-2">Organizer:</label>
                <input
                    type="text"
                    name="organizer"
                    value={newEvent.organizer}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Event
                </button>
            </form>
        </div>
    );
};

export default AddEventPage;
