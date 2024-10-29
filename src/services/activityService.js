// src/api/activityService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Fetch Activities (Public or with Authorization)
export const fetchActivities = async () => {
    try {
        const response = await fetch(`${API_URL}/api/v1/activities`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching activities:", error);
        throw error;
    }
};

// Add Activity (with Authorization)
export const addActivity = async (newActivity) => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve stored user
    const token = storedUser?.token;

    if (!token) {
        throw new Error("User not authenticated. No token available.");
    }

    try {
        const response = await fetch(`${API_URL}/api/v1/activities`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`, // Add the Authorization header with the token
            },
            body: newActivity, // Assuming `newActivity` is a FormData object
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error adding activity:", error);
        throw error;
    }
};
// activityService.js
// Delete Activity (with Authorization)
export const deleteActivity = async (id) => {
    // Retrieve token from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = storedUser?.token;

    if (!token) {
        throw new Error("User not authenticated. No token available.");
    }

    console.log("Deleting Activity Token:", token); // Log the token for debugging

    try {
        const response = await fetch(`${API_URL}/api/v1/activities/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`, // Add the Authorization header with the token
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error deleting activity:", error);
        throw error;
    }
};
