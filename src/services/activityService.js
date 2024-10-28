const API_URL = process.env.REACT_APP_API_URL;

// Fetch Activities
export const fetchActivities = () => {
    return fetch(`${API_URL}/api/v1/activities`)  // Fetching without authorization for public access
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
};

// Add Activity (with Authorization)
export const addActivity = (newActivity) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    return fetch(`${API_URL}/api/v1/activities`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header with the token
        },
        body: newActivity,  // Assuming `newActivity` is a FormData object
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
};

// Delete Activity (with Authorization)
export const deleteActivity = (id) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    return fetch(`${API_URL}/api/v1/activities/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header with the token
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
};
