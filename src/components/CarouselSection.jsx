import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSection = ({ data, fetchData, title }) => {
    const [carouselData, setCarouselData] = useState(data ? data.map(item => ({ ...item, isError: false })) : []);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredSlide, setHoveredSlide] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchActivities = async () => {
            if (fetchData) {
                try {
                    const response = await fetch(`${API_URL}/api/v1/activities`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    setCarouselData(data.map(item => ({ ...item, isError: false })));
                } catch (error) {
                    console.error("Error fetching activities:", error);
                }
            }
        };

        fetchActivities();
    }, [fetchData, API_URL]);

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
        <div
            className="carousel-section bg-lightGray relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isHovered && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                    <h2 className="text-black text-xl md:text-2xl font-bold border border-black p-4">
                        Choose Your Adventure
                    </h2>
                </div>
            )}

            {carouselData.length > 0 ? (
                <Slider {...settings}>
                    {carouselData.map((item, index) => {
                        const imageUrl = item.image.startsWith('/uploads')
                            ? `${API_URL}/public${item.image}`
                            : `${API_URL}/public/uploads/${item.image}`;
                        const itemType = item.type || item;

                        return (
                            <div
                                key={index}
                                className="carousel-slide h-[250px] md:h-[380px] lg:h-[500px] transition-all duration-500 relative overflow-hidden"
                                onMouseEnter={() => setHoveredSlide(index)}
                                onMouseLeave={() => setHoveredSlide(null)}
                            >
                                <div className="relative h-full group">
                                    {imageUrl && !item.isError ? (
                                        <img
                                            src={imageUrl}
                                            alt={itemType}
                                            className={`w-full h-full object-cover object-top rounded-md transition-opacity duration-300 ${hoveredSlide === index ? 'opacity-100' : 'opacity-75'}`}
                                            onError={() => {
                                                const updatedData = [...carouselData];
                                                updatedData[index].isError = true;
                                                setCarouselData(updatedData);
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-md">
                                            <span>{itemType}</span>
                                        </div>
                                    )}
                                    <div className="absolute w-full bottom-0 left-0 bg-white bg-opacity-90 p-4 rounded transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 opacity-100">
                                        <h3 className="text-lg font-bold">{itemType}</h3>
                                        <div className="mt-2">
                                            {item.details && <p className="text-sm">{item.details}</p>}
                                            {item.user?.name && <p className="text-sm">Organizer: {item.user.name}</p>}
                                            {item.location && <p className="text-sm">Location: {item.location}</p>}
                                        </div>
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
