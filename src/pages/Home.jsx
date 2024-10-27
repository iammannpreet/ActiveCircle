import React from 'react';
import Header from '../components/Header';
import ParallaxSection from '../components/ParallaxSection';
import HoverCard from '../components/HoverCard';
import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';
import TestPage from '../components/TestPage';
import AnimatedCard from '../components/AnimatedCard';
import Slider from '../components/Slider';
import OurMission from '../components/OurMission';

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <CarouselSection fetchData={true} />

            <div className=' md:flex w-screen md:px-12 md:py-8 h-auto'>
                <div className='hidden md:block w-1/2 h-[350px]'>
                    <OurMission></OurMission>
                </div>
                <div id="partner" className='md:flex md:flex-col md:items-center'>
                    <div className=' md:flex md:w-[70%]'>
                        <AnimatedCard />
                    </div>
                    <div className='md:w-[80%]'>
                        <Slider />
                        <div className='p-4 md:hidden py-4 pb-12'>
                            <OurMission></OurMission>
                        </div>
                    </div>
                </div>
            </div>
            <ParallaxSection />
            <TestPage />
            <HoverCard />
        </>
    );
};

export default Home;
