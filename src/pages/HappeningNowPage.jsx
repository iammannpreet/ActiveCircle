import React, { useState, useEffect } from 'react';
import useFetchEvents from '../hooks/useFetchEvents';
import useActivities from '../hooks/useActivities';
import Map from '../components/Map';
import FilterButton from '../components/FilterButton'; // Import the reusable button
import { applyDateFilter } from '../utils/dateFilters'; // Import the date filter logic
import { applyTypeFilter } from '../utils/typeFilters'; // Import the type filter logic
import { applyContentFilter } from '../utils/contentFilters'; // Import the content filter logic
import { TypeFilterOptions } from '../utils/filterOptions'; // Import the predefined filter options

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
    const { events, loading: eventsLoading, error: eventsError, handleDeleteEvent } = useFetchEvents(process.env.REACT_APP_API_URL);
    const { activities, loading: activitiesLoading, error: activitiesError, handleDeleteActivity } = useActivities();

    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [filter, setFilter] = useState(FilterOptions.ALL);
    const [contentFilter, setContentFilter] = useState(ContentFilterOptions.ALL);
    const [selectedType, setSelectedType] = useState('');
    const [hoveredItem, setHoveredItem] = useState(null);

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

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div>
                <a href="/">Back</a>
            </div>

            {/* Filter Section */}
            <div className="w-full md:w-1/3 bg-white p-4 overflow-auto">
                <h2 className="text-2xl font-bold mb-4">Happening Now</h2>

                {/* Date Filter Buttons */}
                <div className="filter-buttons mb-4">
                    <FilterButton label="All Dates" onClick={() => setFilter(FilterOptions.ALL)} />
                    <FilterButton label="Today" onClick={() => setFilter(FilterOptions.TODAY)} />
                    <FilterButton label="This Weekend" onClick={() => setFilter(FilterOptions.THIS_WEEKEND)} />
                    <FilterButton label="Next 7 Days" onClick={() => setFilter(FilterOptions.NEXT_7_DAYS)} />
                    <FilterButton label="Next 10 Days" onClick={() => setFilter(FilterOptions.NEXT_10_DAYS)} />
                    <FilterButton label="This Month" onClick={() => setFilter(FilterOptions.THIS_MONTH)} />
                </div>

                {/* Type Filter Buttons */}
                <div className="filter-buttons mb-4">
                    <FilterButton label="Gym Activities" onClick={() => setSelectedType('GYM')} />
                    <FilterButton label="Yoga Sessions" onClick={() => setSelectedType('YOGA')} />
                    <FilterButton label="Walking/Running" onClick={() => setSelectedType('WALK_RUN')} />
                    <FilterButton label="Fishing" onClick={() => setSelectedType('FISHING')} />
                    <FilterButton label="Sports" onClick={() => setSelectedType('SPORTS')} />
                    <FilterButton label="Water Activities" onClick={() => setSelectedType('WATER')} />
                    <FilterButton label="Dance" onClick={() => setSelectedType('DANCE')} />
                    <FilterButton label="Cycling" onClick={() => setSelectedType('CYCLING')} />
                    <FilterButton label="All Types" onClick={() => setSelectedType('')} />
                </div>

                {/* Content Filter Buttons */}
                <div className="filter-buttons mb-4">
                    <FilterButton label="All" onClick={() => setContentFilter(ContentFilterOptions.ALL)} />
                    <FilterButton label="Events Only" onClick={() => setContentFilter(ContentFilterOptions.EVENTS_ONLY)} />
                    <FilterButton label="Activities Only" onClick={() => setContentFilter(ContentFilterOptions.ACTIVITIES_ONLY)} />
                </div>

                {/* Events Section */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Events</h3>
                    {eventsLoading && <p>Loading events...</p>}
                    {eventsError && <p>Error loading events</p>}
                    {!eventsLoading && !eventsError && filteredEvents.length > 0 && (
                        <ul>
                            {filteredEvents.map((event) => (
                                <li
                                    key={event._id}
                                    className="mb-4 border-b pb-2"
                                    onMouseEnter={() => setHoveredItem(event)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <h4 className="font-bold text-lg">{event.type}</h4>
                                    <p>{event.location}</p>
                                    <p>Organized by: {event.organizer}</p>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => handleDeleteEvent(event._id)}
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
                    {!activitiesLoading && !activitiesError && filteredActivities.length > 0 && (
                        <ul>
                            {filteredActivities.map((activity) => (
                                <li
                                    key={activity._id}
                                    className="mb-4 border-b pb-2"
                                    onMouseEnter={() => setHoveredItem(activity)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <h4 className="font-bold text-lg">{activity.type}</h4>
                                    <p>{activity.location}</p>
                                    <p>Organized by: {activity.organizer}</p>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => handleDeleteActivity(activity._id)}
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
                <Map hoveredItem={hoveredItem} />
            </div>
        </div>
    );
};

export default HappeningNowPage;
