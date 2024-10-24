// CarouselSection.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSection = ({ data, fetchData, title }) => {
    const [carouselData, setCarouselData] = useState(data || []); // If no data prop is provided, use state

    const API_URL = process.env.REACT_APP_API_URL; // Using environment variable for API URL

    // Fetch data if the fetchData prop is provided
    useEffect(() => {
        const fetchActivities = async () => {
            if (fetchData) {
                try {
                    const response = await fetch(`${API_URL}/api/v1/activities`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    setCarouselData(data);
                } catch (error) {
                    console.error("Error fetching activities:", error);
                }
            }
        };

        fetchActivities();
    }, [fetchData, API_URL]);

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
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {carouselData.length > 0 ? (
                <Slider {...settings}>
                    {carouselData.map((item, index) => {
                        // Handle cases where data is fetched or passed as prop
                        const imageUrl = item.image ? `${API_URL}/public${item.image}` : null;
                        const itemType = item.type || item; // Item could be a string (activity type) or object

                        return (
                            <div key={index} className="carousel-slide">
                                <div className="relative">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={itemType}
                                            className="w-full h-96 object-top object-cover rounded-md"
                                            onError={() => console.error("Error loading image:", imageUrl)}
                                        />
                                    ) : (
                                        <div className="w-full h-96 bg-gray-300 flex items-center justify-center rounded-md">
                                            <span>{itemType}</span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4 bg-white bg-opacity-70 p-2 rounded">
                                        <h3 className="text-lg font-bold">{itemType}</h3>
                                        {item.location && <p>{item.location}</p>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            ) : (
                <p>No items available.</p>
            )}
        </div>
    );
};

export default CarouselSection;
