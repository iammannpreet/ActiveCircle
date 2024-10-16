import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

// Default location (latitude and longitude)
const center = {
    lat: 43.6532, // Replace with default location lat
    lng: -79.3832 // Replace with default location lng
};

function Hero() {
    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {/* Optional: Add markers for locations */}
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
}

export default Hero;