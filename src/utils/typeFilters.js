// utils/typeFilters.js

export const applyTypeFilter = (type, events, activities, typeFilters) => {
    if (!type) {
        return { filteredEvents: events, filteredActivities: activities };
    }

    const filteredEvents = events.filter(event => typeFilters[type].some(t => t.toLowerCase() === event.type.toLowerCase()));
    const filteredActivities = activities.filter(activity => typeFilters[type].some(t => t.toLowerCase() === activity.type.toLowerCase()));

    return { filteredEvents, filteredActivities };
};
