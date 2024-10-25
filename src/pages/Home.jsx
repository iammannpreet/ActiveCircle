import React from 'react';
import Header from '../components/Header';
import ParallaxSection from '../components/ParallaxSection';
import HoverCard from '../components/HoverCard';
import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';
import TestPage from '../components/TestPage';
import AnimatedCard from '../components/AnimatedCard';
import Slider from '../components/Slider';

const Home = () => {
    return (
        <>
            <Header />

            <Hero />

            {/* 
            <TestPage />
            <HoverCard />
            <ParallaxSection />

            <CarouselSection
                fetchData={true}
                title="Explore Activities" />


            <div className="home">

            </div> */}

            <AnimatedCard></AnimatedCard><Slider></Slider>
        </>
    );
};

export default Home;
