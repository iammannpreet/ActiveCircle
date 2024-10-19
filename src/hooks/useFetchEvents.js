import { useState, useEffect } from 'react';

const useFetchEvents = (apiUrl) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch events from the backend
        fetch(`${apiUrl}/api/v1/events`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [apiUrl]);

    return { events, loading, error };
};

export default useFetchEvents;
