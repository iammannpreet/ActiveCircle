import React from "react";
import useCursorPosition from "../hooks/useCursorPosition"; // Import the custom hook
import useTextShadowAnimation from "../hooks/useTextShadowAnimation"; // Import the new custom hook
import Glowingpng from "./Glowingpng";
import specialC from "../assets/icons/special-c.svg"
import { Link } from "react-router-dom";

const Hero = () => {
    const cursorPos = useCursorPosition();
    useTextShadowAnimation();

    return (
        <div className="hero-container  w-full p-4 md:p-8 lg:p-12 bg-black overflow-hidden cursor-none md:flex lg:flex  justify-center">
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
            /> <div className="text-left my-16 space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white relative line">
                    Stay Active.
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white relative line">
                    Stay Connected.
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white relative line whitespace-nowrap">
                    Explore the <img src={specialC} alt="Special C" className="inline-flex align-middle w-12 lg:w-16" style={{ height: 'auto' }} />ircle.
                </h1>

            </div>

            <div className="md:w-1/2"><Glowingpng />
                <Link to="/happening-now">
                    <button className="bg-primary text-white px-8 py-3 mt-6 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out drop-shadow-md">
                        View Happening Now
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default Hero;
