import React from 'react';
import '../tailwind.css'; // Make sure Tailwind CSS is imported in your main CSS entry point

// Dynamically import all images from the directory
const importAll = (r) => r.keys().map((item) => r(item));
const images = importAll(require.context('../assets/icons/partners', false, /\.(png|jpe?g|svg)$/));

const Slider = () => {
    return (
        <div className="relative w-full h-[120px] max-w-[800px] overflow-hidden mx-auto box-border bg-light-grey">
            <div className="flex items-center justify-center absolute pt-3 animate-scroll">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src.default || src}
                        alt={`partner-logo-${index}`}
                        onError={(e) => { e.target.src = 'path/to/placeholder-image.png'; }}
                        className="h-[100px] mx-[15px] object-contain"
                    />
                ))}
            </div>
            {/* Gradient Fade Effect */}
            <div className="absolute inset-y-0 left-0 w-[50px] z-10 bg-gradient-to-r from-[#f7f7f8] to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-[50px] z-10 bg-gradient-to-l from-[#f7f7f8] to-transparent"></div>
        </div>
    );
};

export default Slider;
