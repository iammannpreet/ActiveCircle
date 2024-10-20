import React from 'react';
import Header from '../components/Header';
import ParallaxSection from '../components/ParallaxSection';
import HoverCard from '../components/HoverCard';
import Hero from '../components/Hero'; import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <div className="flex space-x-4">
                <Link to="/happening-now">
                    <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                        View Happening Now
                    </button>
                </Link>
            </div>
            <div className="home">
                <ParallaxSection />
                <HoverCard />
            </div>
        </>
    );
};

export default Home;


