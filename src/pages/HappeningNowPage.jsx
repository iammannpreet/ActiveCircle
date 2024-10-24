import React, { useState, useEffect } from 'react';
import useFetchEvents from '../hooks/useFetchEvents';
import useActivities from '../hooks/useActivities';
import Map from '../components/Map';
import { applyDateFilter } from '../utils/dateFilters';
import { applyTypeFilter } from '../utils/typeFilters';
import { applyContentFilter } from '../utils/contentFilters';
import { TypeFilterOptions } from '../utils/filterOptions';
import EventModal from '../components/eventModal';

// Date-based filter options
const FilterOptions = {
    ALL: 'all',
    TODAY: 'today',
    THIS_WEEKEND: 'this_weekend',
    NEXT_7_DAYS: 'next_7_days',
    NEXT_10_DAYS: 'next_10_days',
    THIS_MONTH: 'this_month',
};

// Content filter options
const ContentFilterOptions = {
    EVENTS_ONLY: 'events_only',
    ACTIVITIES_ONLY: 'activities_only',
    ALL: 'all',
};

const HappeningNowPage = () => {
    const { events, loading: eventsLoading, error: eventsError } = useFetchEvents(process.env.REACT_APP_API_URL);
    const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [filter, setFilter] = useState(FilterOptions.ALL);
    const [contentFilter, setContentFilter] = useState(ContentFilterOptions.ALL);
    const [selectedType, setSelectedType] = useState('');
    const [hoveredItem, setHoveredItem] = useState(null);
    const [activeDialog, setActiveDialog] = useState(null); // State to manage which dialog is open
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        // Apply Date Filter
        const { filteredEvents: eventsFiltered, filteredActivities: activitiesFiltered } = applyDateFilter(filter, events, activities);
        // Apply Type Filter
        const { filteredEvents: typeFilteredEvents, filteredActivities: typeFilteredActivities } = applyTypeFilter(
            selectedType,
            eventsFiltered,
            activitiesFiltered,
            TypeFilterOptions
        );
        // Apply Content Filter
        const { filteredEvents: finalFilteredEvents, filteredActivities: finalFilteredActivities } = applyContentFilter(
            contentFilter,
            typeFilteredEvents,
            typeFilteredActivities
        );

        setFilteredEvents(finalFilteredEvents);
        setFilteredActivities(finalFilteredActivities);
    }, [filter, selectedType, contentFilter, events, activities]);

    const handleMouseEnter = (dialogName) => {
        setActiveDialog(dialogName); // Set the active dialog on hover
    };

    const handleMouseLeave = () => {
        setActiveDialog(null); // Close the dialog when the mouse leaves
    };
    // Handle item click to open modal
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    // Close modal
    const handleCloseModal = () => {
        setSelectedItem(null);
    };
    return (
        <div className="bg-lightGray text-darkGray flex flex-col md:flex-row h-screen">
            {/* Filter Section */}
            <div className="w-full md:w-1/3 p-4 md:px-8 overflow-auto relative">
                <a href="/">Back</a>
                <h2 className="text-2xl font-bold mb-4 text-black">Happening Now</h2>

                {/* Date Filter Button */}
                <div
                    className="mb-4 relative"
                    onMouseEnter={() => handleMouseEnter('date')}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        className={`px-4 py-2 border rounded ${activeDialog === 'date' ? 'bg-gray-200' : 'bg-white'}`}
                    >
                        {filter !== FilterOptions.ALL ? `${filter.replace('_', ' ')} ✕` : 'Choose Date Here'}
                    </button>

                    {/* Hover-Based Dialog for Date Options */}
                    {activeDialog === 'date' && (
                        <div className="absolute left-[40%] ml-4 top-0 bg-white border rounded shadow-lg p-4 z-10 w-72 transition-opacity duration-300">
                            <div className="flex flex-row justify-between space-x-4">
                                {/* First List */}
                                <div className="w-1/2">
                                    <h3 className="font-semibold mb-2">Date Range 1</h3>
                                    {Object.keys(FilterOptions).slice(0, 3).map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setFilter(FilterOptions[key]);
                                                setActiveDialog(null); // Close dialog after selection
                                            }}
                                            className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                        >
                                            {key.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>

                                {/* Second List */}
                                <div className="w-1/2">
                                    <h3 className="font-semibold mb-2">Date Range 2</h3>
                                    {Object.keys(FilterOptions).slice(3).map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setFilter(FilterOptions[key]);
                                                setActiveDialog(null); // Close dialog after selection
                                            }}
                                            className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                        >
                                            {key.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Type Filter Button */}
                <div
                    className="mb-4 relative"
                    onMouseEnter={() => handleMouseEnter('type')}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        className={`px-4 py-2 border rounded ${activeDialog === 'type' ? 'bg-gray-200' : 'bg-white'}`}
                    >
                        {selectedType !== '' ? `${selectedType} ✕` : 'Choose Types Here'}
                    </button>

                    {/* Hover-Based Dialog for Type Options */}
                    {activeDialog === 'type' && (
                        <div className="absolute left-[40%] ml-4 top-0 bg-white border rounded shadow-lg p-4 z-10 w-72 transition-opacity duration-300">
                            <div className="flex flex-row justify-between space-x-4">
                                {/* First List */}
                                <div className="w-1/2">
                                    <h3 className="font-semibold mb-2">Indoor Types</h3>
                                    {['GYM', 'YOGA', 'DANCE'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setSelectedType(type);
                                                setActiveDialog(null); // Close dialog after selection
                                            }}
                                            className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                        >
                                            {type.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>

                                {/* Second List */}
                                <div className="w-1/2">
                                    <h3 className="font-semibold mb-2">Outdoor Types</h3>
                                    {['WALK_RUN', 'FISHING', 'SPORTS', 'WATER', 'CYCLING'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setSelectedType(type);
                                                setActiveDialog(null); // Close dialog after selection
                                            }}
                                            className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                        >
                                            {type.replace('_', ' ')}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => {
                                            setSelectedType('');
                                            setActiveDialog(null);
                                        }}
                                        className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                    >
                                        All Types
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Filter Button */}
                <div
                    className="mb-4 relative"
                    onMouseEnter={() => handleMouseEnter('content')}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        className={`px-4 py-2 border rounded ${activeDialog === 'content' ? 'bg-gray-200' : 'bg-white'}`}
                    >
                        {contentFilter !== ContentFilterOptions.ALL ? `${contentFilter.replace('_', ' ')} ✕` : 'For Events & Activities'}
                    </button>

                    {/* Hover-Based Dialog for Content Options */}
                    {activeDialog === 'content' && (
                        <div className="absolute left-[40%] ml-4 top-0 bg-white border rounded shadow-lg p-4 z-10 w-72 transition-opacity duration-300">
                            <div className="flex flex-row justify-between space-x-4">
                                {/* First List */}
                                <div className="w-1/2">
                                    <h3 className="font-semibold mb-2">Content 1</h3>
                                    {['EVENTS_ONLY', 'ACTIVITIES_ONLY'].map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setContentFilter(ContentFilterOptions[key]);
                                                setActiveDialog(null); // Close dialog after selection
                                            }}
                                            className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                        >
                                            {key.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>

                                {/* Second List */}
                                <div className="w-1/2">
                                    <h3 className="font-semibold mb-2">Content 2</h3>
                                    <button
                                        onClick={() => {
                                            setContentFilter(ContentFilterOptions.ALL);
                                            setActiveDialog(null);
                                        }}
                                        className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                    >
                                        All
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

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
            <div className="w-full md:w-2/3">
                <Map hoveredItem={hoveredItem} />
            </div>  {/* Modal for selected item */}
            {selectedItem && (
                <EventModal
                    event={selectedItem} // Pass the selected item to the modal
                    onClose={handleCloseModal} // Function to close the modal
                />
            )}
        </div>
    );
};

export default HappeningNowPage;
