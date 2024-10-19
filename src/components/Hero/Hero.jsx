import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import customIcon from '../../assets/images/pointer.png';  // Your custom marker icon

const containerStyle = {
    width: '100%',
    height: '400px',
};

const defaultCenter = {
    lat: 40.785091,
    lng: -73.968285,
};

// Hardcoded events data for testing
const hardcodedEvents = [
    { _id: '1', type: 'Cycling Event', lat: 40.785091, lng: -73.968285 },
    { _id: '2', type: 'Yoga Session', lat: 50.758896, lng: -73.985130 },
    { _id: '3', type: 'Marathon', lat: 40.706086, lng: -73.996864 },
];

function Hero() {
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [isMapLoaded, setIsMapLoaded] = useState(false);  // State to check if map is loaded

    // Handle map load event
    const handleMapLoad = (map) => {
        console.log('Map has loaded:', map);
        setIsMapLoaded(true);  // Set the map as loaded
    };

    // Handle click event for markers
    const handleMarkerClick = (event) => {
        console.log('Marker clicked:', event);
    };

    return (
        <div className="hero-section">
            <div>
                <img className='w-9 h-9' src={customIcon}></img>
            </div>
            {/* Google Map */}
            <div className="map-container">
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={mapCenter}
                        zoom={12}
                        onLoad={handleMapLoad}  // Detect when map has loaded
                    >
                        {/* Render markers only if the map has loaded */}
                        {isMapLoaded && hardcodedEvents.map(event => (
                            <Marker
                                key={event._id}
                                position={{ lat: event.lat, lng: event.lng }}  // Use lat/lng from the event
                                title={event.type}
                                onClick={() => handleMarkerClick(event)}  // Marker click eventanimation={google.maps.Animation.DROP}  // Optional: add animation
                                draggable={true}  // Optional: make marker draggable
                                zIndex={event.importanceLevel}  // Optional: control stacking order
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>

            {/* List of Events */}
            <ul className="activity-list">
                {hardcodedEvents.map((event) => (
                    <li key={event._id} className="activity-item" onClick={() => setMapCenter({ lat: event.lat, lng: event.lng })}>
                        <h3>{event.type}</h3>
                        <p>Location: {event.location}</p>
                        <p>Organizer: {event.organizer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Hero;
