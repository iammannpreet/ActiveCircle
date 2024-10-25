import React from 'react';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import CarouselSection from './CarouselSection'; // The existing carousel component

// Example list of activity types for the smaller carousel
const activityTypes = [
    'Weightlifting', 'Cardio', 'Strength training', 'Circuit training', 'Vinyasa Yoga',
    'Hatha Yoga', 'Morning walks', 'Evening walks', 'Freshwater Fishing', 'Basketball',
    'Soccer', 'Swimming', 'Paddleboarding', 'Zumba', 'Hip hop dance', 'Road cycling'
];

const ParallaxSection = () => {
    // New carousel settings for the smaller type-based carousel
    const typeCarouselSettings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 4, // Show more items in the smaller carousel
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    return (
        <Parallax
            bgImage="/path/to/your/background-image.jpg"
            strength={400}
            className="bg-darkGray"
        >
            {/* Smaller carousel for types */}
            <div className="relative w-full flex flex-col items-center justify-center text-center text-white space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Discover All Types</h2>
                <div className="w-3/4 mx-auto">
                    <CarouselSection
                        data={activityTypes}
                        title="Discover All Types"
                        settings={typeCarouselSettings}
                    />
                </div>
            </div>

            {/* Overlay and Content Container */}
            <div className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white space-y-6 bg-opacity-70 bg-black bg-blend-overlay">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-md">
                    Welcome to ActiveCircle
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl mt-4 drop-shadow-md">
                    Find your fitness buddy, anytime, anywhere.
                </p>

                <Link to="/happening-now">
                    <button className="bg-purple-500 text-white px-8 py-3 mt-6 rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out drop-shadow-md">
                        View Happening Now
                    </button>
                </Link>

                <button className="bg-secondary text-white py-3 px-8 mt-4 rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out drop-shadow-md">
                    Get Started
                </button>
            </div>
        </Parallax>
    );
};

export default ParallaxSection;
