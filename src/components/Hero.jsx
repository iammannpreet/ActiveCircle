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
        <div className=" hero-container h-1/2 lg:h-screen w-full p-4 pb-8 md:p-8 lg:px-16  bg-black overflow-hidden cursor-none justify-center">
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
            <div className=" md:flex justify-between lg:mt-32 ">
                <div className="text-center md:text-left my-16 space-y-4">
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

                <Glowingpng />
            </div>

            <div className="flex flex-col items-center">

                <Link to="/happening-now">
                    <button className="bg-primary text-white px-8 py-3 mt-6 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out drop-shadow-md lg:mt-40">
                        View Happening Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
