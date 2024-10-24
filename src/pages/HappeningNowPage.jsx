import React, { useState, useEffect } from 'react';
import useFetchEvents from '../hooks/useFetchEvents';
import useActivities from '../hooks/useActivities';
import Map from '../components/Map';
import { applyDateFilter } from '../utils/dateFilters';
import { applyTypeFilter } from '../utils/typeFilters';
import { applyContentFilter } from '../utils/contentFilters';
import { TypeFilterOptions } from '../utils/filterOptions';
import EventModal from '../components/eventModal';
import Header from '../components/Header';
import FilterSection from '../components/FilterSection';

const HappeningNowPage = () => {
    const { events, loading: eventsLoading, error: eventsError } = useFetchEvents(process.env.REACT_APP_API_URL);
    const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [filter, setFilter] = useState('all');
    const [contentFilter, setContentFilter] = useState('all');
    const [selectedType, setSelectedType] = useState('');
    const [hoveredItem, setHoveredItem] = useState(null);
    const [activeDialog, setActiveDialog] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const { filteredEvents: eventsFiltered, filteredActivities: activitiesFiltered } = applyDateFilter(filter, events, activities);
        const { filteredEvents: typeFilteredEvents, filteredActivities: typeFilteredActivities } = applyTypeFilter(
            selectedType,
            eventsFiltered,
            activitiesFiltered,
            TypeFilterOptions
        );
        const { filteredEvents: finalFilteredEvents, filteredActivities: finalFilteredActivities } = applyContentFilter(
            contentFilter,
            typeFilteredEvents,
            typeFilteredActivities
        );

        setFilteredEvents(finalFilteredEvents);
        setFilteredActivities(finalFilteredActivities);
    }, [filter, selectedType, contentFilter, events, activities]);

    // Define the handleItemClick function to open the modal with the selected item
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <>
            <Header />
            <div className="flex p-4 md:px-8 lg:px-12 overflow-auto bg-lightGray text-darkGray h-screen">
                <div className='w-100 md:1/2 lg:w-2/3 pr-4'>
                    <h2 className="text-2xl font-bold text-black text-center md:text-start mb-4">Happening Now</h2>
                    <FilterSection
                        filter={filter}
                        setFilter={setFilter}
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        contentFilter={contentFilter}
                        setContentFilter={setContentFilter}
                        activeDialog={activeDialog}
                        setActiveDialog={setActiveDialog} // Pass the function here
                    />

                    {/* Events Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-2 text-black">Events</h3>
                        {eventsLoading && <p>Loading events...</p>}
                        {eventsError && <p>Error loading events</p>}
                        {!eventsLoading && !eventsError && filteredEvents.length > 0 && (
                            <ul>
                                {filteredEvents.map((event) => (
                                    <li
                                        key={event._id}
                                        className="mb-4 border-b pb-2 hover:text-black hover:scale"
                                        onMouseEnter={() => setHoveredItem(event)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        onClick={() => handleItemClick(event)}
                                    >
                                        <h4 className="font-bold text-lg">{event.type}</h4>
                                        <p>{event.location}</p>
                                        <p>Organized by: {event.organizer}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Activities Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-black">Activities</h3>
                        {activitiesLoading && <p>Loading activities...</p>}
                        {activitiesError && <p>Error loading activities</p>}
                        {!activitiesLoading && !activitiesError && filteredActivities.length > 0 && (
                            <ul>
                                {filteredActivities.map((activity) => (
                                    <li
                                        key={activity._id}
                                        className="mb-4 border-b pb-2 hover:text-black"
                                        onMouseEnter={() => setHoveredItem(activity)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        onClick={() => handleItemClick(activity)}
                                    >
                                        <h4 className="font-bold text-lg">{activity.type}</h4>
                                        <p>{activity.location}</p>
                                        <p>Organized by: {activity.organizer}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Right Section: Map */}
                <div className="hidden md:block md:w-screen">
                    <Map hoveredItem={hoveredItem} />
                </div>
            </div>

            {selectedItem && (
                <EventModal event={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </>
    );
};

export default HappeningNowPage;
