import { useEffect, useState } from 'react';
import { fetchActivities, addActivity, deleteActivity } from '../services/activityService';

const useActivities = () => {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({
        type: '',
        location: '',
        details: '',
        organizer: ''
    });

    useEffect(() => {
        fetchActivities()
            .then(setActivities)
            .catch((error) => console.error('Error fetching activities:', error));
    }, []);

    const handleAddActivity = (newActivity) => {
        addActivity(newActivity)
            .then((data) => setActivities([...activities, data]))
            .catch((error) => console.error('Error adding activity:', error));
    };

    const handleDeleteActivity = (id) => {
        deleteActivity(id)
            .then(() => setActivities(activities.filter(activity => activity._id !== id)))
            .catch((error) => console.error('Error deleting activity:', error));
    };

    return { activities, newActivity, setNewActivity, handleAddActivity, handleDeleteActivity };
};

export default useActivities;
