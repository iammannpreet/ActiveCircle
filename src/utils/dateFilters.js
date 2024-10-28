// utils/dateFilters.js

export const applyDateFilter = (filter, events, activities) => {
    const now = new Date();
    let filteredE = events;
    let filteredA = activities;

    switch (filter) {
        case 'today':
            filteredE = events.filter(event => new Date(event.date).toDateString() === now.toDateString());
            filteredA = activities.filter(activity => new Date(activity.date).toDateString() === now.toDateString());
            break;

        case 'this_weekend':
            const day = now.getDay();
            const nextSaturday = new Date(now);
            nextSaturday.setDate(now.getDate() + (6 - day));
            const nextSunday = new Date(nextSaturday);
            nextSunday.setDate(nextSunday.getDate() + 1);

            filteredE = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= nextSaturday && eventDate <= nextSunday;
            });
            filteredA = activities.filter(activity => {
                const activityDate = new Date(activity.date);
                return activityDate >= nextSaturday && activityDate <= nextSunday;
            });
            break;

        case 'next_7_days':
            const nextWeek = new Date(now);
            nextWeek.setDate(now.getDate() + 7);
            filteredE = events.filter(event => new Date(event.date) <= nextWeek);
            filteredA = activities.filter(activity => new Date(activity.date) <= nextWeek);
            break;

        case 'next_10_days':
            const next10Days = new Date(now);
            next10Days.setDate(now.getDate() + 10);
            filteredE = events.filter(event => new Date(event.date) <= next10Days);
            filteredA = activities.filter(activity => new Date(activity.date) <= next10Days);
            break;

        case 'this_month':
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            filteredE = events.filter(event => new Date(event.date).getMonth() === currentMonth && new Date(event.date).getFullYear() === currentYear);
            filteredA = activities.filter(activity => new Date(activity.date).getMonth() === currentMonth && new Date(activity.date).getFullYear() === currentYear);
            break;

        default:
            break;
    }

    return { filteredEvents: filteredE, filteredActivities: filteredA };
};
