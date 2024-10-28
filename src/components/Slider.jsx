import React from 'react';
import '../tailwind.css';

const importAll = (r) => r.keys().map((item) => r(item));
const images = importAll(require.context('../assets/icons/partners', false, /\.(png|jpe?g|svg)$/));

const Slider = () => {
    return (
        <div className="relative w-full h-[120px] md:max-w-[800px] md:w-[90%] lg:w-[70%] overflow-hidden mx-auto box-border bg-light-grey">
            <h1 className='text-center text-base lg:text-lg text-darkGray'>Community Partners</h1>
            <div className="flex items-center justify-center absolute pt-3 animate-scroll">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src.default || src}
                        alt={`partner-logo-${index}`}
                        onError={(e) => { e.target.src = 'path/to/placeholder-image.png'; }}
                        className="h-[60px] mx-[15px] object-contain"
                    />
                ))}
            </div>
            {/* Gradient Fade Effect */}
            <div className="absolute inset-y-0 left-0 w-[50px] z-10 bg-gradient-to-r from-lightGray to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-[50px] z-10 bg-gradient-to-l from-lightGray to-transparent"></div>
        </div>
    );
};

export default Slider;
