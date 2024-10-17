import React from 'react';
import { Parallax } from 'react-parallax';

const ParallaxSection = () => {
    return (
        <Parallax
            bgImage="https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"  // Direct image URL
            strength={300}
        >
            <div style={{ height: 500 }}>
                <section className="text-white h-screen flex items-center justify-center">
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
