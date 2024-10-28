const API_URL = process.env.REACT_APP_API_URL;

// Fetch all events
export const fetchEvents = () => {
    return fetch(`${API_URL}/api/v1/events`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
};

export const addEvent = (newEvent) => {
    return fetch(`${API_URL}/api/v1/events`, {
        method: 'POST',
        body: newEvent,
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
};

// Delete an event by ID
export const deleteEvent = (id) => {
    return fetch(`${API_URL}/api/v1/events/${id}`, {
        method: 'DELETE',
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
};
