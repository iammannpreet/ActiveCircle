import React, { useEffect, useState } from 'react';
import './Home.scss';
import AnimatedCard from '../../components/AnimatedCard/AnimatedCard';
import ParallaxSection from '../../components/ParallaxSection/ParallaxSection';
import HoverCard from '../../components/HoverCard/HoverCard';
import Page from '../../components/Page/Page';

const Home = () => {
    // State to store activities
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({
        type: '',
        location: '',
        details: '',
        organizer: ''
    });

    // Fetch the activities from the backend
    useEffect(() => {
        fetch('http://localhost:5001/api/activities')
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // For debugging purposes
                setActivities(data); // Store the activities in state
            })
            .catch((error) => console.error('Error fetching activities:', error));
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewActivity({ ...newActivity, [name]: value });
    };
    const handleAddActivity = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        fetch('http://localhost:5001/api/activities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newActivity), // Send the new activity data
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the state to include the new activity
                setActivities([...activities, data]);
                // Clear the form
                setNewActivity({
                    type: '',
                    location: '',
                    details: '',
                    organizer: ''
                });
            })
            .catch((error) => console.error('Error adding activity:', error));
    };

    // Function to delete an activity
    const handleDelete = (id) => {
        fetch(`http://localhost:5001/api/activities/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                // Remove the deleted activity from the state
                setActivities(activities.filter(activity => activity._id !== id));
            })
            .catch((error) => console.error('Error deleting activity:', error));
    };
    return (
        <div className="home">
            <h1>Activities</h1><h2>Add a New Activity</h2>
            <form onSubmit={handleAddActivity}>
                <label>Type:</label>
                <input
                    type="text"
                    name="type"
                    value={newActivity.type}
                    onChange={handleInputChange}
                    required
                />
                <AnimatedCard />
                <ParallaxSection />
                <HoverCard />
                <Page />
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={newActivity.location}
                    onChange={handleInputChange}
                    required
                />

                <label>Details:</label>
                <input
                    type="text"
                    name="details"
                    value={newActivity.details}
                    onChange={handleInputChange}
                />

                <label>Organizer:</label>
                <input
                    type="text"
                    name="organizer"
                    value={newActivity.organizer}
                    onChange={handleInputChange}
                />

                <button type="submit">Add Activity</button>
            </form>

            <ul>
                {activities.map((activity) => (

                    <li key={activity._id}>
                        {activity.type} at {activity.location}
                        <button onClick={() => handleDelete(activity._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
