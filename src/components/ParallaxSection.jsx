import React from 'react';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const ParallaxSection = () => {
    return (
        <Parallax
            className='bg-darkGray'
        >  {/* Container for the button */}
            <div className="flex space-x-4">
                <Link to="/happening-now">
                    <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                        View Happening Now
                    </button>
                </Link>
            </div>
            <div style={{ height: 500 }}>
                <section className="text-white h-screen flex justify-center">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Welcome to ActiveCircle</h1>
                        <p className="mt-4 text-xl">Find your fitness buddy, anytime, anywhere.</p>
                        <button className="mt-6 bg-secondary text-white py-2 px-6 rounded-lg">Get Started</button>
                    </div>
                </section>
            </div>
        </Parallax>
    );
};

export default ParallaxSection;
