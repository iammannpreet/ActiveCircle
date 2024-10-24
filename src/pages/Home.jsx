import React from 'react';
import Header from '../components/Header';
import ParallaxSection from '../components/ParallaxSection';
import HoverCard from '../components/HoverCard';
import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';

const Home = () => {
    return (
        <>
            <Header />

            <Hero />

            {/* <ParallaxSection />

            <CarouselSection
                fetchData={true}
                title="Explore Activities" />


            <div className="home">

                <HoverCard />
            </div> */}
        </>
    );
};

export default Home;
