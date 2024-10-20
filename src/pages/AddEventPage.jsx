import React, { useState } from 'react';
import useFetchEvents from '../hooks/useFetchEvents';

// Function to geocode the location (using Mapbox API)
const geocodeLocation = async (location) => {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center; // Get coordinates from the response
        return { latitude, longitude };
    }
    throw new Error('Location not found');
};

const AddEventPage = () => {
    const { newEvent, setNewEvent, handleAddEvent } = useFetchEvents(process.env.REACT_APP_API_URL);
    const [error, setError] = useState(null);  // State to handle errors

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Geocode the location to get latitude and longitude
            const { latitude, longitude } = await geocodeLocation(newEvent.location);

            // Add latitude and longitude to the new event data
            const eventWithCoords = {
                ...newEvent,
                latitude,
                longitude,
            };

            // Call the add function with geocoded data
            handleAddEvent(eventWithCoords);
        } catch (err) {
            console.error('Error adding event:', err);
            setError('Failed to add event. Please check the location.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}  {/* Display error message if there's an error */}
            <form onSubmit={handleSubmit}>  {/* Call handleSubmit instead of handleAddEvent directly */}
                <label className="block mb-2">Type:</label>
                <input
                    type="text"
                    name="type"
                    value={newEvent.type}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    required
                />

                <label className="block mb-2">Location:</label>
                <input
                    type="text"
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    required
                />

                <label className="block mb-2">Organizer:</label>
                <input
                    type="text"
                    name="organizer"
                    value={newEvent.organizer}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    required
                />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Event
                </button>
            </form>
        </div>
    );
};

export default AddEventPage;
