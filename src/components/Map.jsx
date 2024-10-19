import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import EventModal from './eventModal'; // Import the EventModal component
import useFetchEvents from '../hooks/useFetchEvents';
import getCenter from 'geolib/es/getCenter';

function Map() {
    const [hoveredLocation, setHoveredLocation] = useState(null); // State for hovered popup
    const [selectedEvent, setSelectedEvent] = useState(null); // State for the selected event (for modal)
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 47.7577,
        longitude: -122.4376,
        zoom: 11,
    });

    // Use the custom hook to fetch events
    const { events, loading, error } = useFetchEvents(process.env.REACT_APP_API_URL);

    useEffect(() => {
        if (!loading && !error && events.length > 0) {
            const coordinates = events.map(event => ({
                latitude: event.latitude,
                longitude: event.longitude,
            }));

            const centerCoordinates = coordinates.map(coord => ({
                lat: coord.latitude,
                lng: coord.longitude
            }));

            const center = getCenter(centerCoordinates);

            if (center) {
                setViewport((prevViewport) => ({
                    ...prevViewport,
                    latitude: center.latitude,
                    longitude: center.longitude,
                }));
            }
        }
    }, [events, loading, error]);

    const handleMarkerClick = (event) => {
        setSelectedEvent(event); // Set the clicked event for the modal
    };

    const handleCloseModal = () => {
        setSelectedEvent(null); // Close the modal
    };

    return (
        <>
            <ReactMapGL
                {...viewport}
                onMove={(evt) => setViewport(evt.viewState)}
                mapStyle='mapbox://styles/iammannpreet/cm2giu9tp00do01p92fr11v7d'
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                scrollZoom={true}
                dragPan={true}
                dragRotate={true}
            >
                {/* Loop through events and display markers */}
                {events.map((result) => (
                    <Marker
                        key={result._id}
                        longitude={result.longitude}
                        latitude={result.latitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            onMouseEnter={() => setHoveredLocation(result)} // Set hovered event for popup
                            onMouseLeave={() => setHoveredLocation(null)} // Clear hovered event on mouse leave
                            onClick={() => handleMarkerClick(result)} // Open modal on marker click
                            className='cursor-pointer text-2xl animate-bounce'
                            style={{ cursor: 'pointer' }}
                        >
                            📍
                        </p>
                    </Marker>
                ))}

                {/* Show Popup for the hovered location */}
                {hoveredLocation && (
                    <Popup
                        longitude={hoveredLocation.longitude}
                        latitude={hoveredLocation.latitude}
                        onClose={() => setHoveredLocation(null)} // Close popup when not hovered
                        closeOnClick={false} // Don't close popup on marker click (we want modal)
                        anchor="top"
                    >
                        <div className="p-2">
                            <h3 className="font-bold">{hoveredLocation.type}</h3>
                            <p>{hoveredLocation.location}</p>
                        </div>
                    </Popup>
                )}
            </ReactMapGL>

            {/* Render the modal if an event is selected */}
            <EventModal event={selectedEvent} onClose={handleCloseModal} />
        </>
    );
}

export default Map;
