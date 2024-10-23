import React from 'react';
import Header from '../components/Header';
import ParallaxSection from '../components/ParallaxSection';
import HoverCard from '../components/HoverCard';
import Hero from '../components/Hero';
import CardSection from '../components/CardSection';

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <CardSection />


            <div className="home">
                <ParallaxSection />
                <HoverCard />
            </div>
        </>
    );
};

export default Home;
