import React from 'react'
import './Slider.css'
// Dynamically import all images from the directory
const importAll = (r) => r.keys().map((item) => r(item));
const images = importAll(require.context('../assets/icons/partners', false, /\.(png|jpe?g|svg)$/));

const Slider = () => {
    return (
        <div className="slider-outer bg-light-grey">
            <div className="slider-inner">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src.default || src}
                        alt={`partner-logo-${index}`}
                        onError={(e) => { e.target.src = 'path/to/placeholder-image.png'; }}
                        className="slider-image"
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;