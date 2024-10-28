// src/pages/Home.js
import React from 'react';
import HoverCard from '../components/HoverCard';
import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';
import OurMission from '../components/OurMission';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Hero />
            <CarouselSection fetchData={true} />
            <OurMission />
            <Footer />
        </>
    );
};

export default Home;
