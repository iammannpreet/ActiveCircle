const API_URL = process.env.REACT_APP_API_URL;

export const fetchActivities = () => {
    return fetch(`${API_URL}/api/v1/activities`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
};

export const addActivity = (newActivity) => {
    return fetch(`${API_URL}/api/v1/activities`, {
        method: 'POST',
        body: newActivity,
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
};

export const deleteActivity = (id) => {
    return fetch(`${API_URL}/api/v1/activities/${id}`, {
        method: 'DELETE',
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
};
