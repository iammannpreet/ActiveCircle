import React from 'react';
import './Home.scss';
import Header from '../../components/Header/Header';
import ParallaxSection from '../../components/ParallaxSection/ParallaxSection';
import HoverCard from '../../components/HoverCard/HoverCard';
import useActivities from '../../hooks/useActivities';

const Home = () => {
    const { activities, newActivity, setNewActivity, handleAddActivity, handleDelete } = useActivities();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewActivity({ ...newActivity, [name]: value });
    };

    return (
        <>
            <Header />

            <div className="home">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddActivity(newActivity);
                }}>
                    <label>Type:</label>
                    <input type="text" name="type" value={newActivity.type} onChange={handleInputChange} required />
                    <label>Location:</label>
                    <input type="text" name="location" value={newActivity.location} onChange={handleInputChange} required />
                    <label>Details:</label>
                    <input type="text" name="details" value={newActivity.details} onChange={handleInputChange} />
                    <label>Organizer:</label>
                    <input type="text" name="organizer" value={newActivity.organizer} onChange={handleInputChange} />
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

                <ParallaxSection />
                <HoverCard />
            </div>

        </>
    );
};

export default Home;
