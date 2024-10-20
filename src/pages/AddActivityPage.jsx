import React, { useState } from 'react';
import useActivities from '../hooks/useActivities';

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

const AddActivityPage = () => {
    const { newActivity, setNewActivity, handleAddActivity } = useActivities();
    const [error, setError] = useState(null); // State to manage errors

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewActivity({ ...newActivity, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Geocode the location to get latitude and longitude
            const { latitude, longitude } = await geocodeLocation(newActivity.location);

            // Add latitude and longitude to the new activity data
            const activityWithCoords = {
                ...newActivity,
                latitude,
                longitude,
            };

            // Call the add function from the hook with geocoded data
            handleAddActivity(activityWithCoords);

            console.log('Activity added:', activityWithCoords); // For debugging
        } catch (err) {
            console.error('Error adding activity:', err);
            setError('Failed to add activity. Please check the location.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Activity</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message if there's an error */}
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">Type:</label>
                <input
                    type="text"
                    name="type"
                    value={newActivity.type}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    required
                />

                <label className="block mb-2">Location:</label>
                <input
                    type="text"
                    name="location"
                    value={newActivity.location}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    required
                />

                <label className="block mb-2">Details:</label>
                <input
                    type="text"
                    name="details"
                    value={newActivity.details}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                />

                <label className="block mb-2">Organizer:</label>
                <input
                    type="text"
                    name="organizer"
                    value={newActivity.organizer}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Activity
                </button>
            </form>
        </div>
    );
};

export default AddActivityPage;