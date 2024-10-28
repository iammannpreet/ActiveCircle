import React from 'react'
import AnimatedCard from '../components/AnimatedCard'
import Slider from '../components/Slider'
const OurMission = () => {
    return (
        <div className=' bg-lightGray md:flex w-screen md:px-12 md:py-8 h-auto'>
            <div className='hidden md:block w-1/2 h-[350px]'>
                <div className='h-[300px] md:h-[450px] lg:h-[490px] overflow-y-auto px-4 '>
                    <h1 className='pb-2 text-center text-primary text-3xl hover:underline'>Our Mission</h1>
                    <p className='text-darkGray text-center mb-2 text-lg hover:text-black md:text-lr lg:text-xl'>
                        At ActiveCircle, our mission is to inspire and connect individuals through shared activities, promoting healthier lifestyles and stronger communities. We believe that staying active is more than just fitness—it's about building connections, supporting well-being, and creating memorable experiences together.
                    </p>
                    <p className='hidden lg:block text-darkGray text-center hover:text-black md:text-lr lg:text-xl'>
                        Whether you’re looking for a workout partner, a yoga class, kids’ playdates, or group walks, ActiveCircle is designed to make it easier for you to connect with like-minded individuals in your community. By consolidating a range of fitness, family-friendly, and wellness activities in one place, we empower users to explore new opportunities, build meaningful connections, and create memorable experiences.
                    </p>
                    <p className='text-darkGray text-center hover:text-black md:text-lr lg:text-xl'>
                        We’re committed to creating an inclusive and welcoming space for all users to explore new activities, form connections, and lead healthier lives. Join us in building a community that embraces wellness, togetherness, and shared passions.
                    </p>
                </div>
            </div>
            <div id="partner" className='md:flex md:flex-col md:items-end'>
                <div className=' md:flex md:w-[70%]'>
                    <AnimatedCard />
                </div>
                <div className='md:w-[80%]'>
                    <div className='px-8 md:px-0 md:ml-16'>
                        <Slider /></div>
                    <div className='p-4 md:hidden py-4 pb-12'>
                        <div className='h-[300px] md:h-[478px] overflow-y-auto px-4 '>
                            <h1 className='pb-2 text-center text-primary text-3xl hover:underline'>Our Mission</h1>
                            <p className='text-darkGray text-center mb-2 text-lg hover:text-black md:text-lr lg:text-xl'>
                                At ActiveCircle, our mission is to inspire and connect individuals through shared activities, promoting healthier lifestyles and stronger communities. We believe that staying active is more than just fitness—it's about building connections, supporting well-being, and creating memorable experiences together.
                            </p>
                            <p className='hidden lg:block text-darkGray text-center hover:text-black md:text-lr lg:text-xl'>
                                Whether you’re looking for a workout partner, a yoga class, kids’ playdates, or group walks, ActiveCircle is designed to make it easier for you to connect with like-minded individuals in your community. By consolidating a range of fitness, family-friendly, and wellness activities in one place, we empower users to explore new opportunities, build meaningful connections, and create memorable experiences.
                            </p>
                            <p className='text-darkGray text-center hover:text-black md:text-lr lg:text-xl'>
                                We’re committed to creating an inclusive and welcoming space for all users to explore new activities, form connections, and lead healthier lives. Join us in building a community that embraces wellness, togetherness, and shared passions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default OurMission
