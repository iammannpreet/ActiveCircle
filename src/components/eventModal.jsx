import React, { useEffect, useState } from 'react';

const EventModal = ({ event, onClose }) => {
    const [locationDetails, setLocationDetails] = useState(null); // Store city and postal code
    const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_KEY;

    useEffect(() => {
        if (event && event.latitude && event.longitude) {
            // Fetch the city and postal code using Mapbox Geocoding API
            const fetchLocationDetails = async () => {
                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.longitude},${event.latitude}.json?access_token=${MAPBOX_API_KEY}`
                );
                const data = await response.json();

                if (data.features && data.features.length > 0) {
                    const place = data.features.find((feature) => feature.place_type.includes("place"));
                    const postalCode = data.features.find((feature) => feature.place_type.includes("postcode"));

                    const city = place ? place.text : "Unknown City";
                    const postal = postalCode ? postalCode.text : "Unknown Postal Code";

                    setLocationDetails({ city, postal });
                }
            };

            fetchLocationDetails();
        }
    }, [event, MAPBOX_API_KEY]);

    if (!event) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={onClose}
                >
                    ✖
                </button>
                <h2 className="text-2xl font-bold mb-4">{event.type}</h2>
                <p className="mb-2">
                    <span className="font-semibold">Location:</span> {event.location}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Organized by:</span> {event.organizer}
                </p>
                <p className="mb-4">
                    <span className="font-semibold">City:</span> {locationDetails ? locationDetails.city : 'Loading...'}
                </p>
                <p className="mb-4">
                    <span className="font-semibold">Postal Code:</span> {locationDetails ? locationDetails.postal : 'Loading...'}
                </p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default EventModal;