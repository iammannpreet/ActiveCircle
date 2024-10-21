import React, { useState } from 'react';
import useActivities from '../hooks/useActivities';
import { fetchLocationSuggestions, geocodeLocation } from '../utils/location'; // Import location utilities
import TypeDropdown from '../components/TypeDropdown'; // Import reusable dropdown component

const initialActivityState = {
    type: '',
    location: '',
    organizer: '',
    date: '',
    time: '',
    details: ''
};

const AddActivityPage = () => {
    const { newActivity, setNewActivity, handleAddActivity } = useActivities();
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [locationSuggestions, setLocationSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setNewActivity({ ...newActivity, [name]: value });

        if (name === 'location' && value) {
            const suggestions = await fetchLocationSuggestions(value);
            setLocationSuggestions(suggestions);
        } else {
            setLocationSuggestions([]);
        }
    };

    const handleLocationSelect = (location) => {
        setNewActivity({ ...newActivity, location });
        setLocationSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dateTime = new Date(`${newActivity.date}T${newActivity.time}`);
            const { latitude, longitude } = await geocodeLocation(newActivity.location);

            const activityWithCoords = {
                ...newActivity,
                latitude,
                longitude,
                date: dateTime,
            };

            await handleAddActivity(activityWithCoords);
            setNewActivity(initialActivityState);
            setError(null);
            setSuccessMessage('Activity added successfully!');
        } catch (err) {
            setError('Failed to add activity. Please check the location.');
            setSuccessMessage(null);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Activity</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <TypeDropdown value={newActivity.type} onChange={handleInputChange} label="Activity Type" />
                <label className="block mb-2">Location:</label>
                <input
                    type="text"
                    name="location"
                    value={newActivity.location}
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
                <label className="block mb-2">Date:</label>
                <input
                    type="date"
                    name="date"
                    value={newActivity.date}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                    min={today}
                    required
                />
                <label className="block mb-2">Time:</label>
                <input
                    type="time"
                    name="time"
                    value={newActivity.time}
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
