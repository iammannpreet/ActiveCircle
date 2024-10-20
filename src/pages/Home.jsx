import React from 'react';
import Header from '../components/Header';
import ParallaxSection from '../components/ParallaxSection';
import HoverCard from '../components/HoverCard';
import Map from '../components/Map';
import Hero from '../components/Hero';

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <div className="home">
                <ParallaxSection />
                <HoverCard />
            </div>
        </>
    );
};

export default Home;
