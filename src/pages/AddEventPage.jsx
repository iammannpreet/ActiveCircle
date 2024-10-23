import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchEvents from '../hooks/useFetchEvents';
import { fetchLocationSuggestions, geocodeLocation } from '../utils/location';
import TypeDropdown from '../components/TypeDropdown';

// Initial event state
const initialEventState = {
    type: '',
    location: '',
    organizer: '',
    date: '',
    time: '',
    details: '',
    image: null // Added field for image
};

const AddEventPage = () => {
    const { newEvent, setNewEvent, handleAddEvent } = useFetchEvents(process.env.REACT_APP_API_URL);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Updated newEvent:", newEvent);
    }, [newEvent]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });

        if (name === 'location' && value) {
            fetchLocationSuggestions(value).then(setLocationSuggestions);
        } else {
            setLocationSuggestions([]);
        }
    };

    const handleLocationSelect = (location) => {
        setNewEvent({ ...newEvent, location });
        setLocationSuggestions([]);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewEvent({ ...newEvent, image: file });
        }
    };

    const validateForm = () => {
        const { type, location, organizer, date, time, details } = newEvent;
        if (!type || !location || !organizer || !date || !time || !details) {
            return 'Please fill out all required fields.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form
        const validationError = validateForm();
        if (validationError) {
            toast.error(validationError, {
                position: "top-center"
            });
            return;
        }

        try {
            // Parse and log the date and time
            const dateTime = new Date(`${newEvent.date}T${newEvent.time}`);
            console.log("Parsed DateTime:", dateTime.toISOString());

            // Fetch and log geocoded location
            const { latitude, longitude } = await geocodeLocation(newEvent.location);
            console.log("Geocoded Location:", { latitude, longitude });

            // Check for valid latitude and longitude
            if (isNaN(latitude) || isNaN(longitude)) {
                toast.error("Invalid location. Please check the address.", {
                    position: "top-center"
                });
                return;
            }

            // Create FormData object
            const formData = new FormData();
            formData.append('type', newEvent.type);
            formData.append('location', newEvent.location);
            formData.append('details', newEvent.details);
            formData.append('organizer', newEvent.organizer);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('date', dateTime.toISOString());

            // Append the image if it exists
            if (newEvent.image) {
                formData.append('image', newEvent.image);
            }

            // Log FormData for debugging
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            // Send the FormData using your existing handleAddEvent function
            await handleAddEvent(formData);
            setNewEvent(initialEventState);

            toast.success('Event added successfully!', {
                position: "top-center"
            });

            // Redirect to the 'Events' page after success
            setTimeout(() => {
                navigate('/happening-now');
            }, 1500); // Delay redirect to let the toast show
        } catch (err) {
            toast.error('Failed to add event. Please check the location.', {
                position: "top-center"
            });
            console.error("Error adding event:", err); // Add a detailed error message
        }
    };


    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
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
                {/* Image Upload */}
                <label className="block mb-2">Image:</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
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
