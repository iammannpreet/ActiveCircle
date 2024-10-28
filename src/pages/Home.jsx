import React from 'react';
import Header from '../components/Header';
import HoverCard from '../components/HoverCard';
import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';

import OurMission from '../components/OurMission';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <CarouselSection fetchData={true} />
            <OurMission></OurMission>
            <Footer></Footer>
        </>
    );
};

export default Home;
