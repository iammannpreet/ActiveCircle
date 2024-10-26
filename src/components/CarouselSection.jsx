import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSection = ({ data, fetchData, title }) => {
    const [carouselData, setCarouselData] = useState(data || []);
    const [expandedIndex, setExpandedIndex] = useState(null); // Track which slide is expanded

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

    const handleSlideClick = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle expanded state
    };

    return (
        <div className="carousel-section bg-lightGray">
            {carouselData.length > 0 ? (
                <Slider {...settings}>
                    {carouselData.map((item, index) => {
                        // Handle cases where data is fetched or passed as prop
                        const imageUrl = item.image ? `${API_URL}/public${item.image}` : null;
                        const itemType = item.type || item; // Item could be a string (activity type) or object
                        const isExpanded = expandedIndex === index;

                        return (
                            <div
                                key={index}
                                className={`carousel-slide ${isExpanded ? 'h-[250px] md:h-[380px] lg:h-[500px]' : 'h-[250px] md:h-[380px] lg:h-[500px]'} transition-all duration-500 relative overflow-hidden`}
                                onClick={() => handleSlideClick(index)}
                            >
                                <div className="relative h-full"> {/* Ensure inner container takes full height */}
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={itemType}
                                            className="w-full h-full object-cover object-top rounded-md"
                                            onError={() => console.error("Error loading image:", imageUrl)}
                                        />

                                    ) : (
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-md">
                                            <span>{itemType}</span>
                                        </div>
                                    )}
                                    <div className="absolute w-full bottom-0 left-0 bg-white bg-opacity-70 p-2 rounded transition-transform duration-500"
                                        style={{
                                            transform: isExpanded ? 'translateY(0)' : 'translateY(100%)',
                                            opacity: isExpanded ? 1 : 0,
                                        }}>
                                        <h3 className="text-lg font-bold">{itemType}</h3>
                                        {isExpanded && (
                                            <div className="mt-2">
                                                {/* Additional information visible only when expanded */}
                                                {item.details && <p className="text-sm">{item.details}</p>}
                                                {item.organizer && <p className="text-sm">Organizer: {item.organizer}</p>}
                                                {item.location && <p className="text-sm">Location: {item.location}</p>}
                                            </div>
                                        )}
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
