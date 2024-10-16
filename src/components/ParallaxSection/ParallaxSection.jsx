import React from 'react';
import { Parallax } from 'react-parallax';

const ParallaxSection = () => {
    return (
        <Parallax
            bgImage="https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"  // Direct image URL
            strength={300}
        >
            <div style={{ height: 500 }}>
                <h1>Parallax Effect</h1>
            </div>
        </Parallax>
    );
};

export default ParallaxSection;
