import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import EventModal from './EventModal'; // Import the EventModal component
import ActivityModal from './ActivityModal';
import useFetchEvents from '../hooks/useFetchEvents';
import useActivities from '../hooks/useActivities'; // Import the activity hook
import getCenter from 'geolib/es/getCenter';

function Map() {
    const [hoveredLocation, setHoveredLocation] = useState(null); // State for hovered popup
    const [selectedItem, setSelectedItem] = useState(null); // State for the selected event/activity (for modal)
    const [isEvent, setIsEvent] = useState(true); // State to track if the selected item is an event or activity
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 47.7577,
        longitude: -122.4376,
        zoom: 11,
    });

    // Use the custom hook to fetch events
    const { events, loading: eventsLoading, error: eventsError } = useFetchEvents(process.env.REACT_APP_API_URL);
    const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

    useEffect(() => {
        if (!eventsLoading && !activitiesLoading && (events.length > 0 || activities.length > 0)) {
            // Combine events and activities and filter out items with missing coordinates
            const coordinates = [...events, ...activities].filter(item => {
                return item.latitude && item.longitude && !isNaN(item.latitude) && !isNaN(item.longitude);
            }).map(item => ({
                latitude: item.latitude,
                longitude: item.longitude,
            }));

            // Check if there are valid coordinates to calculate the center
            if (coordinates.length > 0) {
                const centerCoordinates = coordinates.map(coord => ({
                    lat: coord.latitude,
                    lng: coord.longitude,
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
        }
    }, [events, activities, eventsLoading, activitiesLoading]);


    const handleMarkerClick = (item, isEvent = true) => {
        setSelectedItem(item); // Set the clicked item (event/activity) for the modal
        setIsEvent(isEvent); // Set whether the clicked item is an event or activity
    };

    const handleCloseModal = () => {
        setSelectedItem(null); // Close the modal
    };

    if (eventsLoading || activitiesLoading) return <div>Loading...</div>;
    if (eventsError || activitiesError) return <div>Error loading data</div>;

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
                {/* Display event markers */}
                {events.map((event) => (
                    <Marker
                        key={event._id}
                        longitude={event.longitude}
                        latitude={event.latitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            onMouseEnter={() => setHoveredLocation(event)} // Set hovered event for popup
                            onMouseLeave={() => setHoveredLocation(null)} // Clear hovered event on mouse leave
                            onClick={() => handleMarkerClick(event, true)} // Open event modal on marker click
                            className='cursor-pointer text-2xl animate-bounce text-red-500'
                            style={{ cursor: 'pointer' }}
                        >
                            📍
                        </p>
                    </Marker>
                ))}

                {/* Display activity markers */}
                {activities.map((activity) => (
                    <Marker
                        key={activity._id}
                        longitude={activity.longitude}
                        latitude={activity.latitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            onMouseEnter={() => setHoveredLocation(activity)} // Set hovered activity for popup
                            onMouseLeave={() => setHoveredLocation(null)} // Clear hovered activity on mouse leave
                            onClick={() => handleMarkerClick(activity, false)} // Open activity modal on marker click
                            className='cursor-pointer text-2xl animate-bounce text-green-500' // Style activity markers differently
                            style={{ cursor: 'pointer' }}
                        >
                            🏃
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
                            <h3 className="font-bold">{hoveredLocation.type || hoveredLocation.details}</h3>
                            <p>{hoveredLocation.location}</p>
                        </div>
                    </Popup>
                )}
            </ReactMapGL>

            {/* Render the EventModal or ActivityModal based on the item type */}
            {isEvent && selectedItem && (
                <EventModal event={selectedItem} onClose={handleCloseModal} />
            )}

            {!isEvent && selectedItem && (
                <ActivityModal activity={selectedItem} onClose={handleCloseModal} />
            )}
        </>
    );
}

export default Map;
