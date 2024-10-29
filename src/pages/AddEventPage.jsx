import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchEvents from '../hooks/useFetchEvents';
import { fetchLocationSuggestions, geocodeLocation } from '../utils/location';
import TypeDropdown from '../components/TypeDropdown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const initialEventState = {
    type: '',
    location: '',
    organizer: '',
    date: '',
    time: '',
    details: '',
    image: null
};

const AddEventPage = () => {
    const { newEvent, setNewEvent, handleAddEvent } = useFetchEvents(process.env.REACT_APP_API_URL);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

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

        const validationError = validateForm();
        if (validationError) {
            toast.error(validationError, {
                position: "top-center"
            });
            return;
        }

        try {
            const dateTime = new Date(`${newEvent.date}T${newEvent.time}`);
            const { latitude, longitude } = await geocodeLocation(newEvent.location);

            if (isNaN(latitude) || isNaN(longitude)) {
                toast.error("Invalid location. Please check the address.", {
                    position: "top-center"
                });
                return;
            }

            const formData = new FormData();
            formData.append('type', newEvent.type);
            formData.append('location', newEvent.location);
            formData.append('details', newEvent.details);
            formData.append('organizer', newEvent.organizer);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('date', dateTime.toISOString());

            if (newEvent.image) {
                formData.append('image', newEvent.image);
            }

            await handleAddEvent(formData);
            setNewEvent(initialEventState);

            toast.success('Event added successfully!', {
                position: "top-center"
            });

            setTimeout(() => {
                navigate('/happening-now');
            }, 1500);
        } catch (err) {
            toast.error('Failed to add event. Please check the location.', {
                position: "top-center"
            });
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (<>
        <div className="bg-gradient-to-br from-lightGray to-orange-100 min-h-screen flex items-center justify-center">
            <ToastContainer />
            <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8 space-y-6 relative">
                <button
                    onClick={goBack}
                    className="absolute top-4 left-4 flex items-center space-x-2 text-gray-600 hover:text-primary transition duration-200"
                >
                    <ArrowBackIcon fontSize="small" />
                    <span className="text-lg">Back</span>
                </button>
                <h1 className="text-3xl font-semibold mb-4 text-center text-darkGray">Add New Event</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TypeDropdown value={newEvent.type} onChange={handleInputChange} label="Event Type" />

                    <div>
                        <label className="block text-darkGray font-medium mb-2">Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={newEvent.location}
                            onChange={handleInputChange}
                            className="input border-lightGray focus:ring-primary"
                            placeholder="Enter event location"
                            required
                        />
                        {locationSuggestions.length > 0 && (
                            <ul className="dropdown mt-2">
                                {locationSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleLocationSelect(suggestion.place_name)}
                                    >
                                        {suggestion.place_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-darkGray font-medium mb-2">Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={newEvent.date}
                                onChange={handleInputChange}
                                className="input border-lightGray focus:ring-primary"
                                min={today}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-darkGray font-medium mb-2">Time:</label>
                            <input
                                type="time"
                                name="time"
                                value={newEvent.time}
                                onChange={handleInputChange}
                                className="input border-lightGray focus:ring-primary"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-darkGray font-medium mb-2">Details:</label>
                        <textarea
                            name="details"
                            value={newEvent.details}
                            onChange={handleInputChange}
                            className="input border-lightGray focus:ring-primary"
                            placeholder="Provide event details"
                            rows="4"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-darkGray font-medium mb-2">Organizer:</label>
                        <input
                            type="text"
                            name="organizer"
                            value={newEvent.organizer}
                            onChange={handleInputChange}
                            className="input border-lightGray focus:ring-primary"
                            placeholder="Enter organizer name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-darkGray font-medium mb-2">Image:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="input border-lightGray focus:ring-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition duration-300"
                    >
                        Add Event
                    </button>
                </form>
            </div>
        </div>
    </>
    );
};

export default AddEventPage;
