import React, { useState } from 'react';
import useFetchEvents from '../hooks/useFetchEvents';
import useActivities from '../hooks/useActivities';
import Map from '../components/Map'; // Your existing Map component

const HappeningNowPage = () => {
    const { events, loading: eventsLoading, error: eventsError, handleDeleteEvent } = useFetchEvents(process.env.REACT_APP_API_URL);
    const { activities, loading: activitiesLoading, error: activitiesError, handleDeleteActivity } = useActivities();
    const [hoveredItem, setHoveredItem] = useState(null); // Track the hovered item

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div>
                <a href="/">Back</a>
            </div>
            {/* Left Section: Events & Activities List */}
            <div className="w-full md:w-1/3 bg-white p-4 overflow-auto">
                <h2 className="text-2xl font-bold mb-4">Happening Now</h2>

                {/* Events Section */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Events</h3>
                    {eventsLoading && <p>Loading events...</p>}
                    {eventsError && <p>Error loading events</p>}
                    {!eventsLoading && !eventsError && events.length > 0 && (
                        <ul>
                            {events.map((event) => (
                                <li
                                    key={event._id}
                                    className="mb-4 border-b pb-2"
                                    onMouseEnter={() => setHoveredItem(event)} // Set hovered item for the map
                                    onMouseLeave={() => setHoveredItem(null)} // Clear hovered item when mouse leaves
                                >
                                    <h4 className="font-bold text-lg">{event.type}</h4>
                                    <p>{event.location}</p>
                                    <p>Organized by: {event.organizer}</p><button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => handleDeleteEvent(event._id)} // Delete event
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Activities Section */}
                <div>
                    <h3 className="text-xl font-bold mb-2">Activities</h3>
                    {activitiesLoading && <p>Loading activities...</p>}
                    {activitiesError && <p>Error loading activities</p>}
                    {!activitiesLoading && !activitiesError && activities.length > 0 && (
                        <ul>
                            {activities.map((activity) => (
                                <li key={activity._id} className="mb-4 border-b pb-2"
                                    onMouseEnter={() => setHoveredItem(activity)} // Set hovered item for the map
                                    onMouseLeave={() => setHoveredItem(null)} // Clear hovered item when mouse leaves

                                >
                                    <h4 className="font-bold text-lg">{activity.type}</h4>
                                    <p>{activity.location}</p>
                                    <p>Organized by: {activity.organizer}</p><button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => handleDeleteActivity(activity._id)} // Delete event
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {/* Right Section: Map */}
            <div className="w-full md:w-2/3">
                {/* Pass the hovered item to the Map */}
                <Map hoveredItem={hoveredItem} />
            </div>
        </div>
    );
};

export default HappeningNowPage;
