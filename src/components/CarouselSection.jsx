// CarouselSection.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSection = () => {
    const [activities, setActivities] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL; // Using environment variable for API URL

    // Fetch activities with images
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${API_URL}/api/v1/activities`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();
    }, [API_URL]);

    // Settings for the carousel slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    return (
        <div className="carousel-section">
            <h2 className="text-2xl font-bold mb-4">Explore Activities</h2>
            {activities.length > 0 ? (
                <Slider {...settings}>
                    {activities.map((activity, index) => {
                        // Construct the image URL using the same logic as in EventModal
                        const imageUrl = activity.image ? `${API_URL}/public${activity.image}` : null;

                        return (
                            <div key={index} className="carousel-slide">
                                <div className="relative">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={activity.type}
                                            className="w-full h-96 object-cover rounded-md"
                                            onError={() => console.error("Error loading image:", imageUrl)}
                                        />
                                    ) : (
                                        <div className="w-full h-96 bg-gray-300 flex items-center justify-center rounded-md">
                                            <span>No Image Available</span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4 bg-white bg-opacity-70 p-2 rounded">
                                        <h3 className="text-lg font-bold">{activity.type}</h3>
                                        <p>{activity.location}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            ) : (
                <p>No activities available.</p>
            )}
        </div>
    );
};

export default CarouselSection;
