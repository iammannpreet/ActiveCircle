export const applyContentFilter = (filter, events, activities) => {
    switch (filter) {
        case 'events_only':
            return { filteredEvents: events, filteredActivities: [] }; // Return only events
        case 'activities_only':
            return { filteredEvents: [], filteredActivities: activities }; // Return only activities
        default:
            return { filteredEvents: events, filteredActivities: activities }; // Return both if no filter
    }
};
