import React, { useState, useEffect } from 'react';
import '../tailwind.css';
import yoga1 from '../assets/images/mob-cycling.png';
import yoga3 from '../assets/images/mob-leg-wide.png';
import yoga4 from '../assets/images/mob-one-arm-push.png';
import yoga5 from '../assets/images/mob-push-up.png';
import yoga6 from '../assets/images/mob-stretch.png';
import yoga7 from '../assets/images/dance.png';
import yoga11 from '../assets/images/yoga-pure.png';

const mobileImages = [yoga1, yoga4, yoga3, yoga5, yoga6];
const desktopImages = [yoga11, yoga7, yoga6];

const Glowingpng = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Change image array based on screen size
    const images = isMobile ? mobileImages : desktopImages;

    useEffect(() => {
        // Listen for window resize to update `isMobile`
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);

        // Change the image every 5 seconds
        const interval = setInterval(() => {
            setFade(false); // Start fade-out

            setTimeout(() => {
                // Change image after the fade-out is done
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
                setFade(true); // Start fade-in after changing the image
            }, 1000); // Allow some time for the fade-out to complete (adjust based on your CSS duration)
        }, 5000); // Interval to change image every 5 seconds

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, [images.length]);

    return (
        <div className="bg-black flex justify-center items-center overflow-hidden">
            <img
                src={images[currentImageIndex]}
                alt="Yoga Silhouette"
                className={`w-60 h-60 md:w-80 md:h-80 object-cover md:p-14 object-center glowing-outline transition-opacity duration-[1000ms] ease-in-out transform ${fade ? 'opacity-100' : 'opacity-0'} `}

            />
        </div>
    );
};

export default Glowingpng;
