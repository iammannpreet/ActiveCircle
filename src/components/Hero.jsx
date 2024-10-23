import React from "react";
import useCursorPosition from "../hooks/useCursorPosition"; // Import the custom hook
import useTextShadowAnimation from "../hooks/useTextShadowAnimation"; // Import the new custom hook
import Glowingpng from "./Glowingpng";
import specialC from '../assets/fonts/special-c.svg'

const Hero = () => {
    const cursorPos = useCursorPosition(); // Use the custom hook
    useTextShadowAnimation(); // Apply the text shadow animations

    return (
        <div className="hero-container relative w-full p-4 md:p-8 lg:p-12 bg-black overflow-hidden cursor-none md:flex lg:flex  justify-center">
            <div className="text-left my-16 space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-white relative whitespace-nowrap">
                    Stay Active.
                </h1>
                <h1 className="text-5xl lg:text-6xl font-bold text-white relative whitespace-nowrap">
                    Stay Connected.
                </h1>
                <h1 className="text-5xl lg:text-6xl font-bold text-white relative whitespace-nowrap">
                    Explore the <img src={specialC} alt="Special C" className="inline-flex align-middle w-12 lg:w-16" style={{ height: 'auto' }} />ircle.
                </h1>
            </div>


            {/* Right side: Image or visual element */}
            <div className="md:w-1/2"><Glowingpng />
                {/* Add your image or visual component here */}
            </div>
            {/* Cursor Follower */}
            <div
                className="cursor-follower"
                style={{
                    position: "absolute",
                    top: cursorPos.y,
                    left: cursorPos.x,
                    pointerEvents: "none",
                    backgroundColor: "#ff833f",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                }}
            />
        </div>
    );
};

export default Hero;
