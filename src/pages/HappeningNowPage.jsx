
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
            <div className="flex p-4 md:px-8 lg:px-12 bg-lightGray text-darkGray h-screen">
                {/* Left Section: List */}
                <div className='w-full md:w-1/2 lg:w-1/3 pr-4 h-full overflow-y-auto'>
                    <h2 className="text-2xl font-bold text-black text-center md:text-start mb-4">Happening Now</h2>
                    <div className='flex align-middle justify-center md:justify-start'>
                        <FilterSection
                            filter={filter}
                            setFilter={setFilter}
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                            contentFilter={contentFilter}
                            setContentFilter={setContentFilter}
                            activeDialog={activeDialog}
                            setActiveDialog={setActiveDialog}
                        />
                    </div>
                    {/* Events Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-2 text-black">Events</h3>
                        {eventsLoading && <p>Loading events...</p>}
                        {eventsError && <p>Error loading events</p>}
                        {!eventsLoading && !eventsError && filteredEvents.length > 0 && (
                            <ul>
                                {filteredEvents.map((event) => {
                                    const imageUrl = event.image ? `${process.env.REACT_APP_API_URL}/public${event.image}` : null;
                                    return (
                                        <li
                                            key={event._id}
                                            className="mb-4 border-b pb-2 hover:border-gray-700 hover:text-black transform transition duration-300 flex items-center justify-between group"
                                            onMouseEnter={() => setHoveredItem(event)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            onClick={() => handleItemClick(event)}
                                        >
                                            {/* Event Details */}
                                            <div className="w-1/2">
                                                <h4 className="font-bold text-base">{event.type}</h4>
                                                <p className='text-xs lg:text-sm mt-2'>{event.location}</p>
                                                <p className='text-xs lg:text-sm mt-2'>Organized by: {event.organizer}</p>
                                            </div>

                                            {/* Display the image if available */}
                                            {imageUrl && (
                                                <img
                                                    src={imageUrl}
                                                    alt={`${event.type}`}
                                                    className="w-1/2 ml-4 rounded-lg transition-filter duration-300 filter brightness-75 group-hover:brightness-100 group-hover:scale-105 "
                                                    onError={() => console.error("Error loading image:", imageUrl)}
                                                />
                                            )}
                                        </li>
                                    );
                                })}
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
                                {filteredActivities.map((activity) => {
                                    const imageUrl = activity.image ? `${process.env.REACT_APP_API_URL}/public${activity.image}` : null;
                                    return (
                                        <li
                                            key={activity._id}
                                            className="mb-4 border-b pb-2 hover:border-gray-700 hover:text-black transform  transition duration-300 flex items-center justify-between group"
                                            onMouseEnter={() => setHoveredItem(activity)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            onClick={() => handleItemClick(activity)}
                                        >

                                            {/* Activity Details */}
                                            <div className="w-1/2">
                                                <h4 className="font-bold text-base">{activity.type}</h4>
                                                <p className='text-xs lg:text-sm mt-2'>{activity.location}</p>
                                                <p className='text-xs lg:text-sm mt-2'>Organized by: {activity.organizer}</p>
                                            </div>

                                            {/* Display the image if available */}
                                            {imageUrl && (
                                                <img
                                                    src={imageUrl}
                                                    alt={`${activity.type}`}
                                                    className="w-1/2 ml-4 rounded-lg transition-filter duration-300 filter brightness-75 group-hover:brightness-100 group-hover:scale-105"
                                                    onError={() => console.error("Error loading image:", imageUrl)}
                                                />
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Right Section: Map */}
                <div className="hidden md:block md:w-1/2 lg:w-2/3 h-full">
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

