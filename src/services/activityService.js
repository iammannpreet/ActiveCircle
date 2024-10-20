const API_URL = process.env.REACT_APP_API_URL;

export const fetchActivities = () => {
    return fetch(`${API_URL}/api/v1/activities`)  // Corrected URL to include versioning
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
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
};

export const deleteActivity = (id) => {
    return fetch(`${API_URL}/api/v1/activities/${id}`, {  // Corrected URL and path
        method: 'DELETE',
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
};
