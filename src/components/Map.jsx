import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import EventModal from './eventModal';
import getCenter from 'geolib/es/getCenter';
import useFetchEvents from '../hooks/useFetchEvents';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import useActivities from '../hooks/useActivities';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

function Map({ hoveredItem }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [hoveredLocation, setHoveredLocation] = useState(null);
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 47.7577, // Default latitude if user location is not available
        longitude: -122.4376, // Default longitude if user location is not available
        zoom: 11,
    });

    const { events, loading: eventsLoading, error: eventsError } = useFetchEvents(process.env.REACT_APP_API_URL);
    const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setViewport((prevViewport) => ({
                        ...prevViewport,
                        latitude,
                        longitude,
                    }));
                },
                (error) => {
                    console.error("Error fetching user's location:", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (!eventsLoading && !activitiesLoading && (events.length > 0 || activities.length > 0)) {
            const coordinates = [...events, ...activities]
                .filter(item => item.latitude && item.longitude)
                .map(item => ({ latitude: item.latitude, longitude: item.longitude }));

            if (coordinates.length > 0) {
                const center = getCenter(coordinates.map(coord => ({ lat: coord.latitude, lng: coord.longitude })));
                if (center) {
                    setViewport(prev => ({
                        ...prev,
                        latitude: center.latitude,
                        longitude: center.longitude,
                    }));
                }
            }
        }
    }, [events, activities, eventsLoading, activitiesLoading]);

    useEffect(() => {
        if (hoveredItem) {
            setHoveredLocation(hoveredItem);
        } else {
            setHoveredLocation(null);
        }
    }, [hoveredItem]);

    return (
        <>
            <ReactMapGL
                {...viewport}
                onMove={evt => setViewport(evt.viewState)}
                mapStyle='mapbox://styles/iammannpreet/cm2giu9tp00do01p92fr11v7d'
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                scrollZoom={true}
                dragPan={true}
                dragRotate={true}
            >
                {events.map(event => (
                    <Marker
                        key={event._id}
                        longitude={event.longitude}
                        latitude={event.latitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            onMouseEnter={() => setHoveredLocation(event)}
                            onMouseLeave={() => setHoveredLocation(null)}
                            onClick={() => setSelectedItem(event)}
                            className="cursor-pointer text-2xl animate-bounce"
                            style={{
                                color: hoveredLocation === event ? '#ff5722' : '#ff833f',
                            }}
                        >
                            < DirectionsBikeIcon />
                        </p>
                    </Marker>
                ))}

                {activities.map(activity => (
                    <Marker
                        key={activity._id}
                        longitude={activity.longitude}
                        latitude={activity.latitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            onMouseEnter={() => setHoveredLocation(activity)}
                            onMouseLeave={() => setHoveredLocation(null)}
                            onClick={() => setSelectedItem(activity)}
                            className="cursor-pointer text-2xl animate-pulse"
                            style={{
                                color: hoveredLocation === activity ? '#ff5722' : '#ff833f', // Darker shade of orange when hovered
                            }}
                        >
                            <EmojiPeopleIcon />
                        </p>
                    </Marker>
                ))}

                {hoveredLocation && (
                    <Popup
                        longitude={hoveredLocation.longitude}
                        latitude={hoveredLocation.latitude}
                        onClose={() => setHoveredLocation(null)}
                        closeOnClick={false}
                        anchor="top"
                    >
                        <div className="p-2">
                            <h3 className="font-bold">{hoveredLocation.type || hoveredLocation.details}</h3>
                            <p>{hoveredLocation.location}</p>
                        </div>
                    </Popup>
                )}

                {selectedItem && (
                    selectedItem.type ? (
                        <EventModal event={selectedItem} onClose={() => setSelectedItem(null)} />
                    ) : (
                        <EventModal activity={selectedItem} onClose={() => setSelectedItem(null)} />
                    )
                )}
            </ReactMapGL>
        </>
    );
}

export default Map;
