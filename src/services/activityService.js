// services/activityService.js
const API_URL = process.env.REACT_APP_API_URL;

export const fetchActivities = () => {
    return fetch(`${API_URL}/api/activities`).then(response => response.json());
};

export const addActivity = (newActivity) => {
    return fetch(`${API_URL}/api/activities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
    }).then(response => response.json());
};

export const deleteActivity = (id) => {
    return fetch(`${API_URL}/api/activities/${id}`, {
        method: 'DELETE',
    }).then(response => response.json());
};
