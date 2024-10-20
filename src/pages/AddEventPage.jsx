import React, { useState } from 'react';

// Geocode location using Mapbox API
const geocodeLocation = async (location) => {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center; // Get coordinates
        return { latitude, longitude };
    }
    throw new Error('Location not found');
};

const AddEventPage = () => {
    const [eventData, setEventData] = useState({
        type: '',
        location: '',
        organizer: '',
    });
    const [error, setError] = useState(null);  // For error handling

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Geocode the location
            const { latitude, longitude } = await geocodeLocation(eventData.location);

            // Prepare event data with latitude and longitude
            const newEvent = {
                ...eventData,
                latitude,
                longitude,
            };

            // Send the new event to the backend
            await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            console.log('Event added:', newEvent);  // For debugging
        } catch (err) {
            console.error('Error adding event:', err);
            setError('Failed to add event. Please check the location.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">Type:</label>
                <input
                    type="text"
                    name="type"
                    value={eventData.type}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    required
                />

                <label className="block mb-2">Location:</label>
                <input
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    required
                />

                <label className="block mb-2">Organizer:</label>
                <input
                    type="text"
                    name="organizer"
                    value={eventData.organizer}
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
